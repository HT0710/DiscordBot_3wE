const {
  SlashCommandBuilder,
  ChannelType,
  channelMention,
  PermissionFlagsBits,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require("discord.js");
const Guild = require("../../schemas/guild");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("history")
    .setDescription("Set a channel to store deleted messages.")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("Set history storage channel to")
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
    ),
  async execute(interaction, client) {
    if (!interaction.memberPermissions.has(PermissionFlagsBits.ManageGuild)) {
      return await interaction.reply({
        content: "You don't have permission to use this command!",
        ephemeral: true,
      });
    }

    const guild = await Guild.findOne({ id: interaction.guildId });

    const channel = interaction.options.getChannel("channel");

    if (guild.history === channel.id)
      return await interaction.reply({
        content: "History is already set to this channel!",
        ephemeral: true,
      });

    await guild.updateOne({ history: channel.id });

    await interaction.reply({
      content: `History storage has been set to ${channelMention(channel.id)}`,
      ephemeral: true,
    });

    await channel.send("This channel is now history storage.");

    if (
      channel
        .permissionsFor(interaction.guild.roles.everyone)
        .has(PermissionFlagsBits.ViewChannel)
    ) {
      await interaction.followUp({
        content: `\`\`\`CS\nHistory channel is public, do you want to private it?\n\`\`\``,
        components: [
          new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setCustomId("history-private-on")
              .setLabel("Oke")
              .setStyle(ButtonStyle.Success)
              .setEmoji("👌"),
            new ButtonBuilder()
              .setCustomId("history-private-off")
              .setLabel("Nah")
              .setStyle(ButtonStyle.Danger)
              .setEmoji("👐")
          ),
        ],
        ephemeral: true,
      });
    }
  },
};
