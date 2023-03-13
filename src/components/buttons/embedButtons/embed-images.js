const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: {
    name: `embed-images`,
  },
  async execute(interaction, client) {
    const embed = interaction.message.embeds[0];
    const first = require("../../../extras/embed-checkFirst")(embed);

    const thumbnailRow = new TextInputBuilder()
      .setCustomId("thumbnail")
      .setLabel("Thumbnail URL")
      .setPlaceholder("https://...")
      .setStyle(TextInputStyle.Short)
      .setRequired(false);
    const imageRow = new TextInputBuilder()
      .setCustomId("image")
      .setLabel("Image URL")
      .setPlaceholder("https://...")
      .setStyle(TextInputStyle.Short)
      .setRequired(false);

    const prevEmbed = EmbedBuilder.from(embed);
    if (!first) {
      if (prevEmbed.data.thumbnail)
        thumbnailRow.setValue(prevEmbed.data.thumbnail.url);
      if (prevEmbed.data.image) imageRow.setValue(prevEmbed.data.image.url);
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
