const { EmbedBuilder, Colors } = require("discord.js");

module.exports = {
  data: {
    name: `history-private-off`,
  },
  async execute(interaction, client) {
    await interaction.update({
      embeds: [
        new EmbedBuilder()
          .setColor(Colors.Green)
          .setTitle(
            `\`\`\`${interaction.message.embeds[0].title} and 🔓 public.\`\`\``
          ),
      ],
      components: [],
    });
  },
};
