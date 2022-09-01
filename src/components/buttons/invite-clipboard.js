const { ButtonStyle, ButtonBuilder } = require("discord.js");

module.exports = {
  data: {
    name: `invite-clipboard`,
  },
  async execute(interaction, client) {
    const prevMsg = interaction.message;
    const embed = prevMsg.embeds[0].data;
    const inviteURL = embed.description.match(/\((.*?)\)/i)[1];
    const exec = require("../../functions/tools/cb-exec");

    exec(inviteURL);

    const successButton = new ButtonBuilder()
      .setCustomId("invite-clipboard")
      .setLabel("Copied!")
      .setEmoji("✨")
      .setStyle(ButtonStyle.Success);

    prevMsg.nonce = Math.random().toString().slice(2);
    prevMsg.components[0].components[0] = successButton;

    await interaction.update(prevMsg);
  },
};
