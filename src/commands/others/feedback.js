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
    const id = interaction.member.id;
    const modal = new ModalBuilder()
      .setCustomId("feedback-submit")
      .setTitle("FEEDBACK FORM")
      .addComponents(
        new ActionRowBuilder().addComponents(
          new TextInputBuilder()
            .setCustomId("nameInput")
            .setLabel("Nickname")
            .setPlaceholder("Anonymous#" + id.slice(0, 3) + id.slice(-3))
            .setValue("Anonymous#" + id.slice(0, 3) + id.slice(-3))
            .setStyle(TextInputStyle.Short)
            .setRequired(false)
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
