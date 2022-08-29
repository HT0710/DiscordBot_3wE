const {
  SlashCommandBuilder,
  PermissionsBitField,
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
    // Check Permissions
    const MMP = PermissionsBitField.Flags.ManageMessages;
    if (!interaction.appPermissions.has(MMP))
      return await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor(Colors.Red)
            .setTitle(
              "```Bot don't have permissions to execute this command.```"
            ),
        ],
        ephemeral: true,
      });
    const app = await client.application.fetch();
    if (
      !interaction.memberPermissions.has(MMP) &&
      interaction.member.id !== app.owner.id
    )
      return await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor(Colors.Red)
            .setTitle(
              "```User don't have permissions to execute this command.```"
            ),
        ],
        ephemeral: true,
      });

    const amount = interaction.options.getInteger("amount");

    // Execute
    await interaction.channel
      .bulkDelete(amount, true)
      .then(
        await interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setColor(Colors.Green)
              .setTitle(
                `\`\`\`Successfully cleaned [${amount}] messages.\`\`\``
              ),
          ],
          ephemeral: true,
        })
      )
      .catch((error) => {
        console.error(error.message);
        interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setColor(Colors.Red)
              .setTitle(
                "```There was an error while trying to clean message in this channel!```"
              ),
          ],
          ephemeral: true,
        });
      });
  },
};
