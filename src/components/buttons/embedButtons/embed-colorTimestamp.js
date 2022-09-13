const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: {
    name: `embed-colorTimestamp`,
  },
  async execute(interaction, client) {
    const embed = interaction.message.embeds[0];
    const prevEmbed = EmbedBuilder.from(embed);

    const colorRow = new TextInputBuilder()
      .setCustomId("color")
      .setLabel("Color")
      .setPlaceholder("Name or Hex. /help faq [embed colors]")
      .setStyle(TextInputStyle.Short)
      .setRequired(false);
    const timestampRow = new TextInputBuilder()
      .setCustomId("timestamp")
      .setLabel("Timestamp")
      .setPlaceholder("true or false (Enter other words will auto false)")
      .setStyle(TextInputStyle.Short)
      .setRequired(false);

    if (prevEmbed.data.color) {
      const convert = require("color-convert");
      ((color) => {
        if (color !== "2f3136") colorRow.setValue(convert.hex.keyword(color));
      })(prevEmbed.data.color.toString(16));
    }
    if (prevEmbed.data.timestamp) timestampRow.setValue("true");
    else timestampRow.setValue("false");

    const colorTimestampModal = new ModalBuilder()
      .setCustomId("embed-colorTimestamp")
      .setTitle("Edit color and timestamp of the Embed")
      .addComponents(
        new ActionRowBuilder().addComponents(colorRow),
        new ActionRowBuilder().addComponents(timestampRow)
      );

    await interaction.showModal(colorTimestampModal);
  },
};
