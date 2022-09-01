const { SlashCommandBuilder, EmbedBuilder, Colors } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Return my ping!"),
  async execute(interaction, client) {
    const message = await interaction.deferReply({ fetchReply: true });

    const embed = new EmbedBuilder()
      .setColor(Colors.Gold)
      .addFields(
        {
          name: `⚡ **Ping**`,
          value: `> **\`${client.ws.ping}ms\`**`,
          inline: true,
        },
        {
          name: `⌛ **Latency**`,
          value: `> **\`${
            message.createdTimestamp - interaction.createdTimestamp
          }ms\`**`,
          inline: true,
        }
      )
      .setTimestamp();

    await interaction.editReply({ embeds: [embed] });
  },
};
