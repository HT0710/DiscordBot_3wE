const { EmbedBuilder } = require("discord.js");
const isValidURL = require("../../../extras/isValidURL");

module.exports = {
  data: {
    name: "embed-images",
  },
  async execute(interaction, client) {
    const embed = interaction.message.embeds[0];
    const first = require("../../../extras/embed-checkFirst")(embed);
    const prevEmbed = EmbedBuilder.from(embed);

    const thumbnail = interaction.fields.getTextInputValue("thumbnail");
    const image = interaction.fields.getTextInputValue("image");

    if (first) {
      if (!thumbnail && !image) return await interaction.update({});
      else {
        var newEmbed = new EmbedBuilder();
        if (isValidURL(thumbnail)) newEmbed.setThumbnail(thumbnail);
        if (isValidURL(image)) newEmbed.setImage(image);
        if (prevEmbed.data.color) newEmbed.setColor(prevEmbed.data.color);
        if (prevEmbed.data.timestamp) newEmbed.setTimestamp();
      }
    } else {
      var newEmbed = prevEmbed;
      if (thumbnail === "") delete newEmbed.data.thumbnail;
      else if (isValidURL(thumbnail)) newEmbed.setThumbnail(thumbnail);

      if (image === "") delete newEmbed.data.image;
      else if (isValidURL(image)) newEmbed.setImage(image);
    }

    try {
      await interaction.update({ embeds: [newEmbed], files: [] });
    } catch (error) {}
  },
};
