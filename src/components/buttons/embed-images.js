const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require("discord.js");

module.exports = {
  data: {
    name: `embed-images`,
  },
  async execute(interaction, client) {
    const checkFirst = (a, b) =>
      a.length === b.length && a.every((i) => b.includes(i));
    const embed = interaction.message.embeds[0];
    const first = checkFirst(Object.keys(embed.data), [
      "type",
      "title",
      "timestamp",
      "thumbnail",
      "image",
      "footer",
      "fields",
      "description",
      "color",
      "author",
    ]);

    const thumbnailRow = new TextInputBuilder()
      .setCustomId("thumbnail")
      .setLabel("Thumbnail URL")
      .setStyle(TextInputStyle.Short)
      .setRequired(false);
    const imageRow = new TextInputBuilder()
      .setCustomId("image")
      .setLabel("Image URL")
      .setStyle(TextInputStyle.Short)
      .setRequired(false);

    if (!first) {
      if (embed.data.thumbnail) thumbnailRow.setValue(embed.data.thumbnail.url);
      if (embed.data.image) imageRow.setValue(embed.data.image.url);
    }

    const imagesModal = new ModalBuilder()
      .setCustomId("embed-images")
      .setTitle("Edit images of the Embed")
      .addComponents(
        new ActionRowBuilder().addComponents(thumbnailRow),
        new ActionRowBuilder().addComponents(imageRow)
      );
    await interaction.showModal(imagesModal);
  },
};
