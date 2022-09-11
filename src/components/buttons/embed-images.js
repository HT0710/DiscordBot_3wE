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
    const imagesModal = new ModalBuilder()
      .setCustomId("embed-images")
      .setTitle("Edit images of the Embed")
      .addComponents(
        new ActionRowBuilder().addComponents(
          new TextInputBuilder()
            .setCustomId("embed-images-thumbnail")
            .setLabel("Thumbnail URL")
            .setStyle(TextInputStyle.Short)
            .setRequired(false)
        ),
        new ActionRowBuilder().addComponents(
          new TextInputBuilder()
            .setCustomId("embed-images-image")
            .setLabel("Image URL")
            .setStyle(TextInputStyle.Short)
            .setRequired(false)
        )
      );
    await interaction.showModal(imagesModal);
  },
};
