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
    await interaction.deferReply({ ephemeral: true });

    const messageId = await interaction.options.getString("message_id");
    const message = await interaction.channel.messages.fetch(messageId);
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
