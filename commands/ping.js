const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong & Latency!"),
  async execute(interaction) {
    let latency = new Date() - new Date(interaction.createdAt);
    await interaction.reply(`Pong! - **\`${latency}ms\`**`);
  },
};
