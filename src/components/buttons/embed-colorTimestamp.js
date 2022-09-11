const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require("discord.js");

module.exports = {
  data: {
    name: `embed-colorTimestamp`,
  },
  async execute(interaction, client) {
    const colorTimestampModal = new ModalBuilder()
      .setCustomId("embed-colorTimestamp")
      .setTitle("Edit color and timestamp of the Embed")
      .addComponents(
        new ActionRowBuilder().addComponents(
          new TextInputBuilder()
            .setCustomId("embed-colorTimestamp-color")
            .setLabel("Color")
            .setPlaceholder("Name or Hex. /help faq [embed colors]")
            .setStyle(TextInputStyle.Short)
            .setRequired(false)
        ),
        new ActionRowBuilder().addComponents(
          new TextInputBuilder()
            .setCustomId("embed-colorTimestamp-timestamp")
            .setLabel("Timestamp")
            .setPlaceholder(
              "True or False. (Enter other words will auto False)"
            )
            .setStyle(TextInputStyle.Short)
            .setRequired(false)
        )
      );
    await interaction.showModal(colorTimestampModal);
  },
};
