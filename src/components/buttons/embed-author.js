const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: {
    name: `embed-author`,
  },
  async execute(interaction, client) {
    const embed = interaction.message.embeds[0];
    const first = require("../../extras/embed-checkFirst")(embed);
    const prevEmbed = EmbedBuilder.from(embed);
    const author = prevEmbed.data.author;

    const nameRow = new TextInputBuilder()
      .setCustomId("name")
      .setLabel("Name")
      .setStyle(TextInputStyle.Short)
      .setRequired(false);
    const iconRow = new TextInputBuilder()
      .setCustomId("iconURL")
      .setLabel("Icon URL")
      .setPlaceholder("https://...")
      .setStyle(TextInputStyle.Short)
      .setRequired(false);
    const urlRow = new TextInputBuilder()
      .setCustomId("url")
      .setLabel("Author URL")
      .setPlaceholder("https://...")
      .setStyle(TextInputStyle.Short)
      .setRequired(false);

    if (!first && author) {
      if (author.name) nameRow.setValue(author.name);
      if (author.icon_url) iconRow.setValue(author.icon_url);
      if (author.url) urlRow.setValue(author.url);
    }

    const authorModal = new ModalBuilder()
      .setCustomId("embed-author")
      .setTitle("Edit author of the Embed")
      .addComponents(
        new ActionRowBuilder().addComponents(nameRow),
        new ActionRowBuilder().addComponents(iconRow),
        new ActionRowBuilder().addComponents(urlRow)
      );

    await interaction.showModal(authorModal);
  },
};
