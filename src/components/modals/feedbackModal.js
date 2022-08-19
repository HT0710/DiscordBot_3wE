const { time } = require("discord.js");

module.exports = {
  data: {
    name: "feedback",
  },
  async execute(interaction, client) {
    const name = interaction.fields.getTextInputValue("nameInput");
    const feedback = interaction.fields.getTextInputValue("feedbackInput");

    const feedbackChannel = client.channels.cache.find(
      (channel) => channel.id == "1010136111059828817"
    );

    await interaction.deferReply({ ephemeral: true });

    await feedbackChannel.send(
      `**${name ? name : "Anonymous"}** - ${time(
        new Date()
      )}\`\`\`${feedback}\`\`\``
    );

    await interaction.editReply({
      content: "Thanks for the feedback!",
    });
  },
};
