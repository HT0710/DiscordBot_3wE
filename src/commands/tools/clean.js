const chalk = require("chalk");
const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
  Colors,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clean")
    .setDescription("Cleans the channel messages.")
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("Amount of messages to clean. Max: 20")
        .setMinValue(1)
        .setMaxValue(20)
        .setRequired(true)
    ),
  async execute(interaction, client) {
    await interaction.deferReply({ ephemeral: true });

    // Check Permissions
    const MMP = PermissionFlagsBits.ManageMessages;
    if (!interaction.appPermissions.has(MMP)) {
      const permsEmbed = new EmbedBuilder()
        .setColor(Colors.Red)
        .setTitle(
          "`Bot don't have [Manage Messages] permission to execute this command.`"
        );

      return await interaction.editReply({ embeds: [permsEmbed] });
    }

    const app = await client.application.fetch();
    if (
      !interaction.memberPermissions.has(MMP) &&
      interaction.member.id !== app.owner.id
    ) {
      const permsEmbed = new EmbedBuilder()
        .setColor(Colors.Red)
        .setTitle(
          "`User don't have [Manage Messages] permission to execute this command.`"
        );

      return await interaction.editReply({ embeds: [permsEmbed] });
    }

    const amount = interaction.options.getInteger("amount");

    // Execute
    try {
      await interaction.channel.bulkDelete(amount, true);

      const doneEmbed = new EmbedBuilder()
        .setColor(Colors.Green)
        .setTitle(`\`Successfully cleaned [${amount}] messages.\``);

      await interaction.editReply({ embeds: [doneEmbed] });
    } catch (error) {
      console.error(
        chalk.red("[Bunk Delete Error]:"),
        chalk.yellow(error.name),
        error.message
      );

      const errorEmbed = new EmbedBuilder()
        .setColor(Colors.Red)
        .setTitle(
          "`There was an error while trying to clean message in this channel!`"
        );
      await interaction.editReply({ embeds: [errorEmbed] });
    }
  },
};
