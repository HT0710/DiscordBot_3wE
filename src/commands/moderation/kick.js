const {
  SlashCommandBuilder,
  EmbedBuilder,
  Colors,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kicks the member provided.")
    .addUserOption((option) =>
      option
        .setName("member")
        .setDescription("Choose the member to kick")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("reason").setDescription("Reason for kicking this member")
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
  async execute(interaction, client) {
    if (interaction.appPermissions.has(PermissionFlagsBits.KickMembers)) "";
    const member = interaction.options.getMember("member");
    const user = interaction.options.getUser("member");
    const reason = interaction.options.getString("reason");

    const errorEmbed = (content) =>
      new EmbedBuilder().setColor(Colors.Red).setTitle(`\`${content}\``);
    const errorReply = (embed) =>
      interaction.reply({ embeds: [embed], ephemeral: true });

    if (member.id === interaction.member.id)
      return errorReply(errorEmbed("Cannot kick yourself!"));

    if (member.id === client.user.id)
      return errorReply(
        errorEmbed("Bot cannot kick itself! /help faq [how to remove a bot]")
      );

    if (member.user.bot)
      return errorReply(
        errorEmbed("Cannot kick this bot! /help faq [how to remove a bot]")
      );

    if (!member.kickable)
      return errorReply(
        errorEmbed("You do not have enough permission to kick this member.")
      );

    await interaction.deferReply();

    const kickedEmbed = new EmbedBuilder()
      .setColor(Colors.Red)
      .setTitle(`*\`You was kicked from server @${interaction.guild.name}.\`*`);
    if (reason) kickedEmbed.setDescription(`>>> **Reason:** ${reason}`);
    await user.send({ embeds: [kickedEmbed] });

    await member.kick(reason);

    const doneEmbed = new EmbedBuilder()
      .setColor(Colors.Green)
      .setTitle(`*\`@${member.displayName} was kicked❕\`*`);
    if (reason) doneEmbed.setDescription(`>>> **Reason:** ${reason}`);
    await interaction.editReply({ embeds: [doneEmbed] });
  },
};
