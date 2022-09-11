const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: {
    name: "embed-images",
  },
  async execute(interaction, client) {
    const thumbnail = interaction.fields.getTextInputValue("thumbnail");
    const image = interaction.fields.getTextInputValue("image");
    const embed = interaction.message.embeds[0];
    const isValidURL = require("../../extras/isValidURL");
    const first = require("../../extras/embed-checkFirst")(embed);

    if (first && (thumbnail || image)) {
      var newEmbed = new EmbedBuilder();
      if (isValidURL(thumbnail)) newEmbed.setThumbnail(thumbnail);
      if (isValidURL(image)) newEmbed.setImage(image);
    } else {
      var newEmbed = EmbedBuilder.from(embed);
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
