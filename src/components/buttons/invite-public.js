const { ButtonBuilder, ButtonStyle, EmbedBuilder } = require("discord.js");

module.exports = {
  data: {
    name: `invite-public`,
  },
  async execute(interaction, client) {
    const prevMsg = interaction.message;
    const embed = prevMsg.embeds[0].data;
    const channel = embed.title.match(/#(.*?)./i)[1];
    const inviteURL = embed.description.match(/\((.*?)\)/i)[1];
    const last = embed.description.includes("Expire:");

    const joinButton = new ButtonBuilder()
      .setURL(inviteURL)
      .setLabel("Click here!")
      .setStyle(ButtonStyle.Link)
      .setEmoji("✨");

    prevMsg.nonce = Math.random().toString().slice(2);
    embed.title = `\`\`\`Click the button to join #${channel.name}.\`\`\``;
    prevMsg.components[0].components = [joinButton];

    const msg = await interaction.channel.send(prevMsg);
    await interaction.update({
      content: "Done!",
      embeds: [],
      components: [],
    });

    if (last) {
      setTimeout(() => {
        const expiredEmbed = new EmbedBuilder().setTitle(
          `\`\`\`#${channel.name} invite link has Expired!\`\`\``
        );

        msg.edit({
          embeds: [expiredEmbed],
          components: [],
        });
      }, (embed.description.match(/<t:(.*?):R>/i)[1] - Math.round(new Date().getTime() / 1000)) * 1000);
    }
  },
};
