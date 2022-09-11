const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: {
    name: `embed-cancel`,
  },
  async execute(interaction, client) {
    const cancelEmbed = new EmbedBuilder()
      .setColor("Red")
      .setTitle("`Embed canceled!`");
    await interaction.update({ embeds: [cancelEmbed], components: [] });
  },
};
