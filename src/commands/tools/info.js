const {
  SlashCommandBuilder,
  EmbedBuilder,
  Colors,
  time,
  GuildPremiumTier,
  GuildNSFWLevel,
  ChannelType,
  ActivityType,
} = require("discord.js");
const Version = require("../../schemas/version");

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
        .addBooleanOption((option) =>
          option.setName("public").setDescription("Public this info")
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("server")
        .setDescription("Show server info")
        .addBooleanOption((option) =>
          option.setName("public").setDescription("Public this info")
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("me")
        .setDescription("Show 3wE Bot info")
        .addBooleanOption((option) =>
          option.setName("public").setDescription("Public this info")
        )
    ),
  async execute(interaction, client) {
    switch (interaction.options.getSubcommand()) {
      case "member": {
        const public = interaction.options.getBoolean("public");
        if (public) await interaction.deferReply();
        else await interaction.deferReply({ ephemeral: true });

        const user = interaction.options.getUser("target");
        const member = interaction.options.getMember("target");
        const embed = new EmbedBuilder()
          .setColor(member.displayHexColor)
          .setTitle(`🔎 \u200b \`@${member.displayName} Member Information\``)
          .setThumbnail(
            member.displayAvatarURL({
              dynamic: true,
              extension: "png",
              size: 4096,
            })
          )
          .setFields(
            {
              name: `Username`,
              value: `\`${user.tag}\``,
              inline: true,
            },
            {
              name: `Nickname`,
              value: `\`${member.nickname ? member.nickname : "None"}\``,
              inline: true,
            },
            {
              name: `Bot`,
              value: `\`${user.bot ? "True" : "False"}\``,
              inline: true,
            },
            {
              name: `Status`,
              value: `\`${
                member.presence ? member.presence.status : "offline"
              }\``,
              inline: true,
            },
            {
              name: `Current Activity`,
              value: ((presence) => {
                if (!presence) return "`None`";
                let type = presence.type;
                let name = presence.name;
                switch (type) {
                  case ActivityType.Playing:
                    type = "Playing";
                    break;
                  case ActivityType.Streaming:
                    type = "Streaming";
                    break;
                  case ActivityType.Listening:
                    type = "Listening";
                    break;
                  case ActivityType.Watching:
                    type = "Watching";
                    break;
                  case ActivityType.Custom:
                    type = "Custom";
                    name = presence.state;
                    break;
                  case ActivityType.Competing:
                    type = "Competing";
                    break;
                }
                return type === "Custom"
                  ? `\`${type}:\` ` + presence.emoji.name + " " + name
                  : `\`${type} ${name}\``;
              })(member.presence?.activities[0]),
              inline: false,
            },

            {
              name: `Discord Joined At`,
              value: time(user.createdAt, "d"),
              inline: true,
            },
            {
              name: `Server Joined At`,
              value: time(member.joinedAt, "d"),
              inline: true,
            },
            {
              name: `Role List (Total: \`${member.roles.cache.size}\`)`,
              value: `>>> ${((roleCache) =>
                roleCache.map((role) => role.name).join(", "))(
                member.roles.cache
              )}`,
              inline: false,
            }
          )
          .setFooter({
            text: `Member ID: ${user.id} | Information by ${client.user.username}`,
          });

        return await interaction.editReply({ embeds: [embed] });
      }

      case "server": {
        const public = interaction.options.getBoolean("public");
        if (public) await interaction.deferReply();
        else await interaction.deferReply({ ephemeral: true });

        const guild = interaction.guild;
        const infoEmbed = new EmbedBuilder()
          .setColor(Colors.Gold)
          .setTitle(`🔎 \u200b \`@${guild.name} Server Information\``)
          .setThumbnail(
            guild.iconURL({
              dynamic: true,
              extension: "png",
              size: 4096,
            })
          )
          .setFooter({
            text: `Server ID: ${guild.id} | Information by ${client.user.username} | * t: Text, v: Voice, o: Other`,
          });

        const owner = await guild.fetchOwner();
        if (guild.description)
          infoEmbed.setDescription(
            `**Owner: \` ${owner.user.tag} \`**\n**Description**\n>>> ${guild.description}`
          );

        infoEmbed.addFields({
          name: "Members",
          value: `\` ${guild.memberCount} \``,
          inline: true,
        });

        const channels = guild.channels.cache;
        const textChannel = channels
          .map((channel) => channel.type === ChannelType.GuildText)
          .filter((o) => o === true);
        const voiceChannel = channels
          .map((channel) => channel.type === ChannelType.GuildVoice)
          .filter((o) => o === true);
        infoEmbed.addFields(
          {
            name: `Channels (${channels.size})`,
            value: `\`${textChannel.length}t\` | \`${
              voiceChannel.length
            }v\` | \`${
              channels.size - textChannel.length - voiceChannel.length
            }o\` *`,
            inline: true,
          },
          {
            name: "Server Create At",
            value: time(guild.createdAt, "d"),
            inline: true,
          },
          {
            name: "NSFW Level",
            value:
              "` " +
              (() => {
                switch (guild.nsfwLevel) {
                  case GuildNSFWLevel.Default:
                    return "Default";
                  case GuildNSFWLevel.Explicit:
                    return "Explicit";
                  case GuildNSFWLevel.Safe:
                    return "Safe";
                  case GuildNSFWLevel.AgeRestricted:
                    return "AgeRestricted";
                }
              })() +
              " `",
            inline: true,
          },
          {
            name: "Premium Tier",
            value:
              "` " +
              (() => {
                switch (guild.premiumTier) {
                  case GuildPremiumTier.None:
                    return "None";
                  case GuildPremiumTier.Tier1:
                    return "Tier 1";
                  case GuildPremiumTier.Tier2:
                    return "Tier 2";
                  case GuildPremiumTier.Tier3:
                    return "Tier 3";
                }
              })() +
              " `",
            inline: true,
          },
          {
            name: "Verified",
            value: "` " + (guild.verified ? "True" : "False") + " `",
            inline: true,
          }
        );

        const roles = guild.roles.cache.map((role) => role.name).join(", ");
        infoEmbed.addFields({
          name: `Roles (Total: \`${guild.roles.cache.size}\`)`,
          value: `>>> ${roles}`,
          inline: false,
        });

        return await interaction.editReply({ embeds: [infoEmbed] });
      }

      case "me": {
        const public = interaction.options.getBoolean("public");
        if (public) await interaction.deferReply();
        else await interaction.deferReply({ ephemeral: true });

        const current = await Version.findOne({}).sort({ _id: -1 });
        const bot = await client.user.fetch();
        const app = await client.application.fetch();
        const infoEmbed = new EmbedBuilder()
          .setColor(Colors.Gold)
          .setThumbnail(
            bot.displayAvatarURL({
              dynamic: true,
              extension: "png",
              size: 4096,
            })
          )
          .setTitle(`🔎 \u200b \`@${bot.username} Bot Information\``)
          .setDescription(
            `**Owner: \`${app.owner.username}#${app.owner.discriminator}\`**` +
              `\n>>> __Contact__: pthung7102002@gmail.com` +
              "\n__Github__: https://github.com/HT0710/DiscordBot_3wE"
          )
          .setFields(
            {
              name: "**Server count**",
              value: `> \` ${client.guilds.cache.size} \``,
              inline: true,
            },
            {
              name: "**Current version**",
              value: `> \` ${current.version} \``,
              inline: true,
            },
            {
              name: "**About me**",
              value: `>>> ${app.description}`,
              inline: false,
            }
          )
          .setFooter({
            text: `Bot ID: ${bot.id} | Developed by ArtA | Give me a /feedback`,
          });

        await interaction.editReply({ embeds: [infoEmbed] });
      }
    }
  },
};
