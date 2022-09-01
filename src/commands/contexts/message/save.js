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
    await interaction.deferReply({ ephemeral: true });

    let message = await interaction.targetMessage.fetch();
    message.nonce = Math.random().toString().slice(2);

    await interaction.member.send(message).catch((e) => {
      message.nonce = Math.random().toString().slice(2);

      interaction.member.send(message).catch((e) => {
        console.error(e.message);

        const errorEmbed = new EmbedBuilder()
          .setColor(Colors.Red)
          .setTitle(
            "```This message could not be sent to you! Check your privacy settings.```"
          );

        return interaction.editReply({ embeds: [errorEmbed] });
      });
    });

    const doneEmbed = new EmbedBuilder()
      .setColor(Colors.Green)
      .setTitle("```✅ Saved!```");

    await interaction.editReply({ embeds: [doneEmbed] });
  },
};
