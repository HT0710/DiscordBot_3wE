const {
  Client,
  Collection,
  GatewayIntentBits,
  ActivityType,
} = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");
const { prefix } = require("./json/config.json");
const token = (() => {
  if (process.env.TOKEN === undefined) {
    const dotenv = require("dotenv");
    dotenv.config();
  }
  return process.env.TOKEN;
})();

const slashUpdate = true;
if (slashUpdate) require("./handlers/commandHandle");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
  ],
});
client.commands = new Collection();
client.commandArray = [];

const commandsPath = path.join(__dirname, "./commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  client.commands.set(command.data.name, command);
}

client.once("ready", (client) => {
  console.log(`${client.user.tag} was summoned! Ready to Die?`);
  client.user.setActivity("Diệt Cộng Sản", { type: ActivityType.Playing });
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  console.log(
    `${interaction.user.tag} in #${interaction.guild.name} triggered ${interaction}.`
  );

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

let channelID = 0;
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (!message.content.startsWith(prefix)) return;

  const ctx = message.content.slice(1).split(" ");
  const command = client.commands.get(ctx[0]);
  if (command) {
    try {
      await command.execute(message);
    } catch (error) {
      console.error(error);
      await message.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }

  switch (ctx[0]) {
    case "test":
      (async () => {
        await message.reply("test");
      })();
      break;

    case "setChannel":
      (async () => {
        channelID = ctx[1];
        await message.reply("Done!");
      })();
      break;

    case "say":
      (async () => {
        if (channelID === 0)
          return await message.reply("use >setChannel [id of channel to say]");
        await message.guild.channels.cache.get(channelID).send(ctx[1]);
      })();
      break;

    default:
      await message.reply(`${ctx.join(" ")}? Are you sure about that.`);
  }
});

client.login(token);
