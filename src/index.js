<<<<<<< Updated upstream
const fs = require("node:fs");
const path = require("node:path");
const { prefix } = require("../json/config.json");
const {
  Client,
  Collection,
  GatewayIntentBits,
  ActivityType,
} = require("discord.js");
const token = (() => {
  if (process.env.TOKEN === undefined) {
    const dotenv = require("dotenv");
    dotenv.config();
  }
  return process.env.TOKEN;
})();

const slashUpdate = true;
if (slashUpdate) require("./slash-commands");
=======
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
const dotenv = require("dotenv").config();
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
const commandsPath = path.join(__dirname, "../commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js") && file !== "AI.js");

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

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (!message.content.startsWith(prefix)) return;

  const ctx = message.content.slice(1);
  const command = client.commands.get(ctx);

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

  switch (ctx) {
    case "test":
      (async () => {
        await message.reply("test");
      })();
      break;
    default:
      await message.reply(`${ctx}? Are you sure about that.`);
  }
});
=======
client.commandArray = [];

const functionsFolder = fs.readdirSync("./src/functions");
for (const folder of functionsFolder) {
  const functionsFile = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of functionsFile) {
    require(`./functions/${folder}/${file}`)(client);
  }
}

client.handleEvents();
client.handleCommands();
>>>>>>> Stashed changes

client.login(token);
