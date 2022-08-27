const {
  SlashCommandBuilder,
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("feedback")
    .setDescription(
      "Send 3wE a feedback, require a feature or report an error."
    ),
  async execute(interaction, client) {
    const modal = new ModalBuilder()
      .setCustomId("feedback")
      .setTitle("Send a feedback")
      .addComponents(
        new ActionRowBuilder().addComponents(
          new TextInputBuilder()
            .setCustomId("nameInput")
            .setLabel("Nickname")
            .setPlaceholder("Anonymous")
            .setValue("Anonymous")
            .setStyle(TextInputStyle.Short)
            .setRequired(true)
        ),
        new ActionRowBuilder().addComponents(
          new TextInputBuilder()
            .setCustomId("feedbackInput")
            .setLabel("Do you have something to say?")
            .setPlaceholder("A feedback, require a feature or report an error")
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true)
        )
      );

    await interaction.showModal(modal);
  },
};
