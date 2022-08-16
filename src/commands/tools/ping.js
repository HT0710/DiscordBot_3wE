const { SlashCommandBuilder, EmbedBuilder, Colors } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Return my ping!"),
  async execute(interaction, client) {
    const message = await interaction.deferReply({
      fetchReply: true,
    });

    const embed = new EmbedBuilder()
      .setColor(Colors.Yellow)
      .setTitle(
        `Ping: **\`${client.ws.ping}ms\`** ~ Latency: **\`${
          message.createdTimestamp - interaction.createdTimestamp
        }ms\`**`
      );

    await interaction.editReply({ embeds: [embed] });
  },
};
