const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");
const { done } = require("../../extras/embeds");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unstick")
    .setDescription("Unstick the current message on this channel.")
    .setDMPermission(true)
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
  async execute(interaction, client) {
    await interaction.deferReply({ ephemeral: true });

    const stickyChannel = await client.stickyChannel.get(
      interaction.channel.id
    );

    if (!stickyChannel) {
      const emptyEmbed = new EmbedBuilder()
        .setColor("Orange")
        .setTitle("`There are no sticky message on this channel.`");
      return await interaction.editReply({ embeds: [emptyEmbed] });
    }

    await client.stickyChannel.delete(interaction.channel.id);

    const message = await interaction.channel.messages.cache.get(
      stickyChannel.messageId
    );
    try {
      await message.delete();
    } catch (error) {}

    await interaction.editReply({ embeds: [done] });
  },
};
