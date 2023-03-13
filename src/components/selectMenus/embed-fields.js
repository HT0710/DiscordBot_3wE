const {
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  ModalBuilder,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: {
    name: `embed-fields`,
  },
  async execute(interaction, client) {
    const value = interaction.values[0];
    const embed = interaction.message.embeds[0];
    const currentEmbed = EmbedBuilder.from(embed);

    const nameRow = new TextInputBuilder()
      .setCustomId("name")
      .setLabel("Name")
      .setStyle(TextInputStyle.Short)
      .setRequired(false);
    const valueRow = new TextInputBuilder()
      .setCustomId("value")
      .setLabel("Value")
      .setPlaceholder("/help faq [text format]")
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(false);
    const inlineRow = new TextInputBuilder()
      .setLabel("Inline")
      .setPlaceholder("true or false (Max 3 fields per row)")
      .setValue("true")
      .setStyle(TextInputStyle.Short)
      .setRequired(false);
    const addFieldsModal = new ModalBuilder();

    if (value !== "embed-addField") {
      const field = currentEmbed.data.fields.at(parseInt(value) - 1);
      nameRow.setValue(field.name);
      valueRow.setValue(field.value);
      inlineRow.setValue(field.inline.toString());
      inlineRow.setCustomId((parseInt(value) - 1).toString());
      addFieldsModal
        .setCustomId("embed-editFields")
        .setTitle(`Edit field ${parseInt(value)}`);
    } else {
      inlineRow.setCustomId("inline");
      addFieldsModal.setCustomId("embed-addFields").setTitle("Add field");
    }

    addFieldsModal.addComponents(
      new ActionRowBuilder().addComponents(nameRow),
      new ActionRowBuilder().addComponents(valueRow),
      new ActionRowBuilder().addComponents(inlineRow)
    );

    await interaction.showModal(addFieldsModal);
  },
};
