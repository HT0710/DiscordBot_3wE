const {
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  ActionRowBuilder,
} = require("discord.js");

module.exports = {
  data: {
    name: `invite-public`,
  },
  async execute(interaction, client) {
    const prevMsg = interaction.message;
    const channel = interaction.channel;
    const dataButton = prevMsg.components[0].components[1].data;
    const inviteURL = dataButton.custom_id;
    const last = dataButton.label.split(" ")[5];

    const newButton = new ButtonBuilder()
      .setURL(inviteURL)
      .setLabel("Click here!")
      .setEmoji("✨")
      .setStyle(ButtonStyle.Link);

    prevMsg.nonce = Math.random().toString().slice(2);
    prevMsg.embeds[0].data.title = `\`\`\`Click the button to join #${channel.name}.\`\`\``;
    prevMsg.components[0].components = [newButton];

    const msg = await interaction.channel.send(prevMsg);

    if (last !== "Forever") {
      setTimeout(() => {
        msg.edit({
          embeds: [
            new EmbedBuilder().setTitle(
              `\`\`\`#${channel.name} invite link has Expired!\`\`\``
            ),
          ],
          components: [
            new ActionRowBuilder().addComponents(newButton.setDisabled(true)),
          ],
        });
      }, (last - 2) * 1000);
    }
  },
};
