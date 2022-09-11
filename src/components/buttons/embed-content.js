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

    if (!first) {
      if (embed.data.title) titleRow.setValue(embed.data.title);
      if (embed.data.description)
        descriptionRow.setValue(embed.data.description);
      if (embed.data.url) urlRow.setValue(embed.data.url);
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
