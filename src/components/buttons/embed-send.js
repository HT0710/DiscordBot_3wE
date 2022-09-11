const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: {
    name: `embed-send`,
  },
  async execute(interaction, client) {
    const embed = interaction.message.embeds[0];
    await interaction.channel.send({ embeds: [embed] });

    const doneEmbed = new EmbedBuilder()
      .setColor("Green")
      .setTitle("`Embed sended!`");
    await interaction.update({ embeds: [doneEmbed], components: [] });
  },
};
