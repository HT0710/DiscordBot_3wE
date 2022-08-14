const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Return my ping!"),
  async execute(interaction, client) {
    const message = await interaction.deferReply({
      fetchReply: true,
    });

    await interaction.editReply({
      content: `Pong!\nServer ping: **\`${
        client.ws.ping
      }ms\`** & My ping: **\`${
        message.createdTimestamp - interaction.createdTimestamp
      }ms\`**`,
    });
  },
};
