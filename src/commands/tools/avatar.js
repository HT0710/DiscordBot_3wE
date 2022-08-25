const { SlashCommandBuilder } = require("discord.js");
const Guild = require("../../schemas/guild");
const imgFormat = require("../../components/functions/exports");

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
            .setDescription("Tag a target to steal there avatar.")
        )
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("server").setDescription("Show server profile avatar.")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("user").setDescription("Show myself profile avatar.")
    ),
  async execute(interaction, client) {
    switch (interaction.options.getSubcommand()) {
      case "member": {
        const target = interaction.options.getUser("target");
        if (!target)
          return await interaction.reply({
            content: "Need a target to steal there avatar.",
            ephemeral: true,
          });
        return await interaction.reply(target.displayAvatarURL(imgFormat));
      }

      case "server": {
        const guild = await Guild.findOne({ id: interaction.guildId });
        if (!guild.iconURL) return await interaction.reply(imgFormat);

        return await interaction.reply(guild.iconURL);
      }

      default: {
        return await interaction.reply(
          interaction.user.displayAvatarURL(imgFormat)
        );
      }
    }
  },
};
