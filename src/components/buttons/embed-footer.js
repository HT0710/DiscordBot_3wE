const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require("discord.js");

module.exports = {
  data: {
    name: `embed-footer`,
  },
  async execute(interaction, client) {
    const footerModal = new ModalBuilder()
      .setCustomId("embed-footer")
      .setTitle("Edit footer of the Embed")
      .addComponents(
        new ActionRowBuilder().addComponents(
          new TextInputBuilder()
            .setCustomId("embed-footer-text")
            .setLabel("Text")
            .setStyle(TextInputStyle.Short)
            .setRequired(false)
        ),
        new ActionRowBuilder().addComponents(
          new TextInputBuilder()
            .setCustomId("embed-footer-icon")
            .setLabel("Icon URL")
            .setStyle(TextInputStyle.Short)
            .setRequired(false)
        )
      );
    await interaction.showModal(footerModal);
  },
};
