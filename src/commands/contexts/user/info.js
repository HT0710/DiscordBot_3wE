const {
  ContextMenuCommandBuilder,
  ApplicationCommandType,
  EmbedBuilder,
  Colors,
  time,
  roleMention,
} = require("discord.js");

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName("Get info")
    .setType(ApplicationCommandType.User),
  async execute(interaction, client) {
    await interaction.deferReply();
    const user = interaction.targetUser;
    const member = await interaction.targetMember.fetch();
    const embed = new EmbedBuilder()
      .setColor(Colors.Gold)
      .setAuthor({
        name: "🔎 \u200b Information Card",
      })
      .setTitle(`User: \`${user.username}#${user.discriminator}\``)
      .setDescription(`**ID:** \u200b ${user.id}`)
      .setThumbnail(
        member.displayAvatarURL({
          dynamic: true,
          extension: "png",
          size: 4096,
        })
      )
      .setFields(
        {
          name: `Nickname` + " \u200b".repeat(10),
          value: member.nickname ? member.nickname : "None",
          inline: true,
        },
        {
          name: `Bot`,
          value: user.bot ? "True" : "False",
          inline: true,
        },
        {
          name: `Account Created At`,
          value: time(user.createdAt, "d"),
          inline: true,
        },
        {
          name: `Status`,
          value: member.presence.status,
          inline: true,
        },
        {
          name: `Current Activity` + " \u200b".repeat(10),
          value: ((activity) => (activity ? activity.name : "None"))(
            member.presence.activities[0]
          ),
          inline: true,
        },
        {
          name: `Server Joined At`,
          value: time(member.joinedAt, "d"),
          inline: true,
        },
        {
          name: `Role List`,
          value: ((roleCache) =>
            roleCache
              .map((role) =>
                role.name === "@everyone" ? role.name : roleMention(role.id)
              )
              .join(", "))(member.roles.cache),
          inline: false,
        }
      );

    await interaction.editReply({ embeds: [embed] });
  },
};
