module.exports = {
  data: {
    name: `history-private-off`,
  },
  async execute(interaction, client) {
    const message = await interaction.message;
    await interaction.update({
      content: `${message.content.split("\n")[0]} and 🔓**\`public\`**`,
      components: [],
    });
  },
};
