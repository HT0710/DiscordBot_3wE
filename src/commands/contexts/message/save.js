const {
  ContextMenuCommandBuilder,
  ApplicationCommandType,
  EmbedBuilder,
  Colors,
} = require("discord.js");

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName("Save this")
    .setType(ApplicationCommandType.Message),
  async execute(interaction, client) {
    let message = await interaction.targetMessage.fetch();
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
