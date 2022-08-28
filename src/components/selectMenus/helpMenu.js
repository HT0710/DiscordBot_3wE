const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");

module.exports = {
  data: {
    name: `helpMenu`,
  },
  async execute(interaction, client) {
    const backButton = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("helpButton")
        .setEmoji("⬅️")
        .setLabel("Back to the selection.")
        .setStyle(ButtonStyle.Secondary)
    );

    const typeCase = require("../functions/typeCase");
    return await typeCase(
      interaction,
      client,
      interaction.values[0],
      backButton
    );
  },
};
