const { Client, GatewayIntentBits } = require("discord.js");
const { token } = require("./config.json");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once("ready", () => {
  console.log("Ready to die!");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;

  if (commandName === "ping") {
    return await interaction.reply("Pang!");
  }

  if (commandName === "server") {
    return await interaction.reply(
      `Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`
    );
  }

  if (commandName === "user") {
    return await interaction.reply(
      `You tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`
    );
  }
});

client.login(token);
