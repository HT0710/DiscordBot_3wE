const { SlashCommandBuilder, EmbedBuilder, Colors } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("save")
    .setDescription("Save by sending the message to you.")
    .addStringOption((option) =>
      option
        .setName("message_id")
        .setDescription("Id of the message you want to save")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const messageId = await interaction.options.getString("message_id");
    const message = await interaction.channel.messages.fetch(messageId);
    message.nonce = Math.random().toString().slice(2);

    try {
      await interaction.member.send(message);

      await interaction.reply({
        embeds: [
          new EmbedBuilder().setColor(Colors.Green).setTitle("```✅ Saved!```"),
        ],
        ephemeral: true,
      });
    } catch (e) {
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor(Colors.Red)
            .setTitle(
              "```This message could not be sent to you! Check your privacy settings.```"
            ),
        ],
        ephemeral: true,
      });
    }
  },
};
