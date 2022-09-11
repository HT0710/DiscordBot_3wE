const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require("discord.js");

module.exports = {
  data: {
    name: `embed-content`,
  },
  async execute(interaction, client) {
    const contentModal = new ModalBuilder()
      .setCustomId("embed-content")
      .setTitle("Edit content of the Embed")
      .addComponents(
        new ActionRowBuilder().addComponents(
          new TextInputBuilder()
            .setCustomId("embed-content-title")
            .setLabel("Title")
            .setStyle(TextInputStyle.Short)
            .setRequired(false)
        ),
        new ActionRowBuilder().addComponents(
          new TextInputBuilder()
            .setCustomId("embed-content-description")
            .setLabel("Description")
            .setPlaceholder("/help faq [text format]")
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(false)
        ),
        new ActionRowBuilder().addComponents(
          new TextInputBuilder()
            .setCustomId("embed-content-url")
            .setLabel("Title URL")
            .setStyle(TextInputStyle.Short)
            .setRequired(false)
        )
      );
    await interaction.showModal(contentModal);
  },
};
