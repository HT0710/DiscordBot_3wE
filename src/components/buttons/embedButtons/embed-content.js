const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: {
    name: `embed-content`,
  },
  async execute(interaction, client) {
    const embed = interaction.message.embeds[0];
    const first = require("../../../extras/embed-checkFirst")(embed);

    const titleRow = new TextInputBuilder()
      .setCustomId("title")
      .setLabel("Title")
      .setStyle(TextInputStyle.Short)
      .setRequired(false);
    const descriptionRow = new TextInputBuilder()
      .setCustomId("description")
      .setLabel("Description")
      .setPlaceholder("/help faq [text format]")
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(false);
    const urlRow = new TextInputBuilder()
      .setCustomId("url")
      .setLabel("Title URL")
      .setPlaceholder("https://...")
      .setStyle(TextInputStyle.Short)
      .setRequired(false);

    const prevEmbed = EmbedBuilder.from(embed);
    if (!first) {
      if (prevEmbed.data.title) titleRow.setValue(prevEmbed.data.title);
      if (prevEmbed.data.description)
        descriptionRow.setValue(prevEmbed.data.description);
      if (prevEmbed.data.url) urlRow.setValue(prevEmbed.data.url);
    }

    const contentModal = new ModalBuilder()
      .setCustomId("embed-content")
      .setTitle("Edit content of the Embed")
      .addComponents(
        new ActionRowBuilder().addComponents(titleRow),
        new ActionRowBuilder().addComponents(descriptionRow),
        new ActionRowBuilder().addComponents(urlRow)
      );

    await interaction.showModal(contentModal);
  },
};
