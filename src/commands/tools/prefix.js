const chalk = require("chalk");
const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
  Colors,
} = require("discord.js");
const Guild = require("../../schemas/guild");

const commands = ["test"];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("prefix")
    .setDescription("Shows prefix commands or Set the prefix of the bot.")
    .addStringOption((option) =>
      option.setName("change").setDescription("Set new prefix for 3wE")
    )
    .addBooleanOption((option) =>
      option.setName("activate").setDescription("Change activation to")
    ),
  async execute(interaction, client) {
    await interaction.deferReply({ ephemeral: true });

    // Get current prefix from database
    const guild = await Guild.findOne({ id: interaction.guild.id });

    // Get options
    const newPrefix = interaction.options.getString("change");
    const changeActivate = interaction.options.getBoolean("activate");

    // Check permissions
    if (newPrefix !== null || changeActivate !== null) {
      const MGP = PermissionFlagsBits.ManageGuild;
      const app = await client.application.fetch();

      if (
        !interaction.memberPermissions.has(MGP) &&
        interaction.member.id !== app.owner.id
      ) {
        const permsEmbed = new EmbedBuilder()
          .setColor(Colors.Red)
          .setTitle(
            "`User don't have [Manage Guild] permission to execute this command.`"
          );
        return await interaction.editReply({ embeds: [permsEmbed] });
      }
    }

    // Execute
    // If change activate
    if (changeActivate !== null) {
      if (guild.prefix.activation === changeActivate) {
        const duplicatedEmbed = new EmbedBuilder()
          .setColor(Colors.Orange)
          .setTitle(
            `Prefix is already **\`${changeActivate ? "On" : "Off"}\`**!`
          );
        return await interaction.editReply({ embeds: [duplicatedEmbed] });
      }

      await guild
        .updateOne({ $set: { "prefix.activation": changeActivate } })
        .catch((e) =>
          console.error(
            chalk.red("[Prefix Active Error]:"),
            chalk.yellow(e.name + ":"),
            e.message
          )
        );

      const doneEmbed = new EmbedBuilder()
        .setColor(Colors.Green)
        .setTitle(
          `Prefix has been set to **\`${changeActivate ? "On" : "Off"}\`**`
        );
      return await interaction.editReply({ embeds: [doneEmbed] });
    }

    // If deactivate
    if (guild.prefix.activation === false) {
      const offEmbed = new EmbedBuilder()
        .setColor(Colors.Orange)
        .setTitle("Server prefix is **`Off`**");
      return await interaction.editReply({ embeds: [offEmbed] });
    }

    // If set prefix
    if (newPrefix) {
      if (guild.prefix.current === newPrefix) {
        const duplicatedEmbed = new EmbedBuilder()
          .setColor(Colors.Orange)
          .setTitle(`Prefix is already **\`${newPrefix}\`**`);
        return await interaction.editReply({ embeds: [duplicatedEmbed] });
      }

      await guild
        .updateOne({ $set: { "prefix.current": newPrefix } })
        .catch((e) =>
          console.error(
            chalk.red("[Prefix Change Error]:"),
            chalk.yellow(e.name + ":"),
            e.message
          )
        );

      const doneEmbed = new EmbedBuilder()
        .setColor(Colors.Green)
        .setTitle(`Prefix has been change to **\`${newPrefix}\`**`);
      return await interaction.editReply({ embeds: [doneEmbed] });
    }

    // If none of those
    const commandsEmbed = new EmbedBuilder()
      .setColor(Colors.Gold)
      .setTitle(`Current server prefix: \` ${guild.prefix.current} \``)
      .setDescription(
        `**Available Commands:**\n>>> ${commands
          .map((x) => `**\`${x}\`**`)
          .join(", ")}`
      );
    return await interaction.editReply({ embeds: [commandsEmbed] });
  },
};
