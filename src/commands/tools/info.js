const {
  SlashCommandBuilder,
  EmbedBuilder,
  Colors,
  time,
} = require("discord.js");
const { imgFormat } = require("../../components/functions/exports");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("test")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("member")
        .setDescription("Show member info")
        .addUserOption((option) =>
          option
            .setName("target")
            .setDescription("Choose a member")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("server").setDescription("Show server info")
    ),
  async execute(interaction, client) {
    switch (interaction.options.getSubcommand()) {
      case "member": {
        await interaction.deferReply();
        const user = interaction.options.getUser("target");
        const member = await interaction.guild.members.cache
          .find((member) => member.id === user.id)
          .fetch();
        const embed = new EmbedBuilder()
          .setColor(Colors.Yellow)
          .setAuthor({
            name: "🔎 \u200b Information Card",
          })
          .setTitle(`User: \`${user.username}#${user.discriminator}\``)
          .setDescription(`**ID:** \u200b ${user.id}`)
          .setThumbnail(member.displayAvatarURL(imgFormat))
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
                roleCache.map((role) => role.name).join(", "))(
                member.roles.cache
              ),
              inline: false,
            }
          );

        return await interaction.editReply({ embeds: [embed] });
      }

      case "server": {
        await interaction.deferReply();
        const guild = interaction.guild;
        const embed = new EmbedBuilder()
          .setColor(Colors.Yellow)
          .setAuthor({ name: "🔎 \u200b Server Information" })
          .setThumbnail(guild.iconURL(imgFormat))
          .setTitle(`Name: \`${guild.name}\``)
          .setDescription(`**ID:** ${guild.id}`);

        if (guild.description)
          embed.addFields({
            name: "Description",
            value: guild.description,
          });

        embed.addFields(
          {
            name: "Owner",
            value: ((owner) =>
              `\`${owner.user.username}#${owner.user.discriminator}\``)(
              await guild.fetchOwner()
            ),
            inline: true,
          },
          {
            name: "Members",
            value: guild.memberCount.toString(),
            inline: true,
          },

          {
            name: "Server Create At",
            value: time(guild.createdAt, "d"),
            inline: true,
          },
          {
            name: "Category Channels",
            value: ((channelCache) =>
              channelCache
                .map((channel) => channel.type === 4)
                .filter((o) => o === true).length)(
              guild.channels.cache
            ).toString(),
            inline: true,
          },
          {
            name: "Text Channels",
            value: ((channelCache) =>
              channelCache
                .map((channel) => channel.type === 0)
                .filter((o) => o === true).length)(
              guild.channels.cache
            ).toString(),
            inline: true,
          },
          {
            name: "Voice Channels",
            value: ((channelCache) =>
              channelCache
                .map((channel) => channel.type === 2)
                .filter((o) => o === true).length)(
              guild.channels.cache
            ).toString(),
            inline: true,
          },
          {
            name: "NSFW Level",
            value: (() => {
              switch (guild.nsfwLevel) {
                case 0:
                  return "Default";
                case 1:
                  return "Explicit";
                case 2:
                  return "Safe";
                case 3:
                  return "AgeRestricted";
              }
            })(),
            inline: true,
          },
          {
            name: "Premium Tier",
            value: (() => {
              switch (guild.premiumTier) {
                case 0:
                  return "None";
                case 1:
                  return "Tier 1";
                case 2:
                  return "Tier 2";
                case 3:
                  return "Tier 3";
              }
            })(),
            inline: true,
          },
          {
            name: "Verified",
            value: guild.verified ? "✅ True" : "❌ False",
            inline: true,
          },
          {
            name: `Roles (Total: ${guild.roles.cache.size})`,
            value: ((roleCache) =>
              roleCache.map((role) => role.name).join(", "))(guild.roles.cache),
            inline: false,
          },
          {
            name: `Features (Total: ${guild.features.length})`,
            value: guild.features.join(", "),
            inline: false,
          }
        );

        await interaction.editReply({ embeds: [embed] });
      }
    }
  },
};
