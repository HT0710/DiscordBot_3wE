const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: {
    name: `embed-footer`,
  },
  async execute(interaction, client) {
    const embed = interaction.message.embeds[0];
    const first = require("../../extras/embed-checkFirst")(embed);
    const prevEmbed = EmbedBuilder.from(embed);
    const footer = prevEmbed.data.footer;

    const textRow = new TextInputBuilder()
      .setCustomId("text")
      .setLabel("Text")
      .setStyle(TextInputStyle.Short)
      .setRequired(false);
    const iconRow = new TextInputBuilder()
      .setCustomId("iconURL")
      .setLabel("Icon URL")
      .setPlaceholder("https://...")
      .setStyle(TextInputStyle.Short)
      .setRequired(false);

    if (!first && footer) {
      if (footer.text) textRow.setValue(footer.text);
      if (footer.icon_url) iconRow.setValue(footer.icon_url);
    }

    const footerModal = new ModalBuilder()
      .setCustomId("embed-footer")
      .setTitle("Edit footer of the Embed")
      .addComponents(
        new ActionRowBuilder().addComponents(textRow),
        new ActionRowBuilder().addComponents(iconRow)
      );

    await interaction.showModal(footerModal);
  },
};
