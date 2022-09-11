const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: {
    name: `embed-send`,
  },
  async execute(interaction, client) {
    const prevMsg = interaction.message;
    prevMsg.components = [];
    prevMsg.nonce = Math.random().toString().slice(2);
    await interaction.channel.send(prevMsg);

    const doneEmbed = new EmbedBuilder()
      .setColor("Green")
      .setTitle("`Embed sended!`");
    await interaction.update({ embeds: [doneEmbed], components: [] });
  },
};
