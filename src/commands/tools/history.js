const {
  SlashCommandBuilder,
  ChannelType,
  channelMention,
  PermissionFlagsBits,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  EmbedBuilder,
  Colors,
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
    await interaction.deferReply({ ephemeral: true });

    const app = await client.application.fetch();
    if (
      !interaction.memberPermissions.has(PermissionFlagsBits.ManageGuild) &&
      interaction.member.id !== app.owner.id
    ) {
      return await interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setColor(Colors.Red)
            .setTitle(
              "```You don't have [Manage Guild] permission to use this command!```"
            ),
        ],
      });
    }

    const guild = await Guild.findOne({ id: interaction.guildId });

    const channel = interaction.options.getChannel("channel");

    if (guild.history === channel.id)
      return await interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setColor(Colors.Orange)
            .setTitle("```History is already set to this channel!```"),
        ],
      });

    await guild.updateOne({ history: channel.id });

    await interaction.editReply({
      embeds: [
        new EmbedBuilder()
          .setColor(Colors.Green)
          .setTitle(
            `\`\`\`History storage has been set to @${channel.name}\`\`\``
          ),
      ],
    });

    await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
      [PermissionFlagsBits.SendMessages]: false,
    });

    await channel.send(
      "This channel is now history storage.\n**`Mute this channel` if you don't want to be distracted!**"
    );

    if (
      channel
        .permissionsFor(interaction.guild.roles.everyone)
        .has(PermissionFlagsBits.ViewChannel)
    ) {
      await interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setColor(Colors.Green)
            .setTitle(`History storage has been set to #${channel.name}`)
            .setDescription(
              `**\`\`\`CS\n${channel.name} channel is public, do you want to private it?\n\`\`\`**`
            ),
        ],
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
      });
    }
  },
};
