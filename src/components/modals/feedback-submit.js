const { time, EmbedBuilder, Colors } = require("discord.js");

module.exports = {
  data: {
    name: "feedback-submit",
  },
  async execute(interaction, client) {
    const name = interaction.fields.getTextInputValue("nameInput");
    const feedback = interaction.fields.getTextInputValue("feedbackInput");

    const feedbackChannel = client.channels.cache.find(
      (channel) => channel.id == "1010136111059828817"
    );

    await interaction.deferReply({ ephemeral: true });

    const id = interaction.member.id;
    await feedbackChannel.send(
      `**${
        name ? name : "Anonymous#" + id.slice(0, 3) + id.slice(-3)
      }** - ${time(new Date())}\`\`\`${feedback}\`\`\``
    );

    await interaction.editReply({
      embeds: [
        new EmbedBuilder()
          .setColor(Colors.Gold)
          .setTitle("```Thanks for the feedback!```"),
      ],
    });
  },
};
