const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { permissionError, sendingError, done } = require("../../extras/embeds");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("sticky")
    .setDescription("Stick a message.")
    .addStringOption((option) =>
      option
        .setName("content")
        .setDescription("The content that you want to sticky")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("frequency")
        .setDescription("Number of messages until resend it (Default: 1)")
        .setMinValue(1)
        .setMaxValue(100)
    )
    .setDMPermission(true)
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
  async execute(interaction, client) {
    await interaction.deferReply({ ephemeral: true });

    const MMP = PermissionFlagsBits.ManageMessages;
    if (!interaction.appPermissions.has(MMP))
      return await interaction.editReply({
        embeds: [permissionError("Manage Messages")],
      });

    const content = interaction.options.getString("content");
    const frequency = interaction.options.getInteger("frequency");
    try {
      var firstMessage = await interaction.channel.send({ content: content });
    } catch (error) {
      return await interaction.editReply({ embeds: [sendingError] });
    }

    await client.stickyChannel.set(interaction.channel.id, {
      messageId: firstMessage.id,
      count: 1,
      content: content,
      frequency: frequency,
    });

    await interaction.editReply({ embeds: [done] });
  },
};
