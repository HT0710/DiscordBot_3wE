const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require("discord.js");

module.exports = {
  data: {
    name: `embed-author`,
  },
  async execute(interaction, client) {
    const authorModal = new ModalBuilder()
      .setCustomId("embed-author")
      .setTitle("Edit author of the Embed")
      .addComponents(
        new ActionRowBuilder().addComponents(
          new TextInputBuilder()
            .setCustomId("embed-author-name")
            .setLabel("Name")
            .setStyle(TextInputStyle.Short)
            .setRequired(false)
        ),
        new ActionRowBuilder().addComponents(
          new TextInputBuilder()
            .setCustomId("embed-author-icon")
            .setLabel("Icon URL")
            .setStyle(TextInputStyle.Short)
            .setRequired(false)
        ),
        new ActionRowBuilder().addComponents(
          new TextInputBuilder()
            .setCustomId("embed-author-url")
            .setLabel("Author URL")
            .setStyle(TextInputStyle.Short)
            .setRequired(false)
        )
      );
    await interaction.showModal(authorModal);
  },
};
