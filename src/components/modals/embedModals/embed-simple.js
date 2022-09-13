const { EmbedBuilder } = require("discord.js");
const convert = require("color-convert");
const colors = require("color-name");

module.exports = {
  data: {
    name: "embed-simple",
  },
  async execute(interaction, client) {
    await interaction.deferReply({ ephemeral: true });

    const title = interaction.fields.getTextInputValue("title");
    const description = interaction.fields.getTextInputValue("description");
    const color = interaction.fields.getTextInputValue("color").toLowerCase();

    if (!title && !description) {
      const requiredEmbed = new EmbedBuilder()
        .setColor("Red")
        .setTitle("`Cannot send an empty Embed!`");
      return await interaction.editReply({ embeds: [requiredEmbed] });
    }

    const embed = new EmbedBuilder();
    if (title) embed.setTitle(title);
    if (description) embed.setDescription(description);
    if (colors.hasOwnProperty(color)) embed.setColor(colors[color]);
    else {
      try {
        embed.setColor(convert.keyword.hex(color));
      } catch (error) {
        embed.setColor("#2f3136");
      }
    }

    await interaction.channel.send({ embeds: [embed] });

    const doneEmbed = new EmbedBuilder()
      .setColor("Green")
      .setTitle("`Embed sended!`");
    await interaction.editReply({ embeds: [doneEmbed] });
  },
};
