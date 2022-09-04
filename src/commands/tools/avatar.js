const { SlashCommandBuilder, EmbedBuilder, Colors } = require("discord.js");
const Guild = require("../../schemas/guild");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Get the avatar of the selected.")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("member")
        .setDescription("Show member profile avatar.")
        .addUserOption((option) =>
          option
            .setName("target")
            .setDescription("Member to get avatar")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("server").setDescription("Show server profile avatar.")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("user").setDescription("Show yourself profile avatar.")
    ),
  async execute(interaction, client) {
    await interaction.deferReply();

    const embed = new EmbedBuilder().setFooter({
      text: `Requested by ${interaction.member.displayName}`,
    });

    switch (interaction.options.getSubcommand()) {
      case "member": {
        const target = interaction.options.getUser("target");

        embed
          .setColor(Colors.Gold)
          .setTitle(`Avatar for \`\`\`${target.tag}\`\`\``)
          .setImage(
            target.displayAvatarURL({
              dynamic: true,
              extension: "png",
              size: 4096,
            })
          );
        break;
      }

      case "server": {
        const guild = await Guild.findOne({ id: interaction.guildId });

        if (!guild.iconURL) {
          embed
            .setColor(Colors.Red)
            .setTitle("```This server has no avatar!```");
        } else {
          embed
            .setColor(Colors.Gold)
            .setTitle(`Avatar for \`\`\`#${guild.name}\`\`\``)
            .setImage(guild.iconURL);
        }
        break;
      }

      case "user": {
        embed
          .setColor(Colors.Gold)
          .setTitle(`Avatar for \`\`\`${interaction.user.tag}\`\`\``)
          .setImage(
            `${interaction.member.displayAvatarURL({
              dynamic: true,
              extension: "png",
              size: 4096,
            })}`
          );
        break;
      }
    }

    return await interaction.editReply({ embeds: [embed] });
  },
};
