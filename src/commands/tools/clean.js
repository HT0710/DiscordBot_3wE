const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");
const content = (str) => ({
  content: str,
  ephemeral: true,
});

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clean")
    .setDescription("Cleans the channel messages.")
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("Amount of messages to clean. Max: 20")
        .setRequired(true)
    ),
  async execute(interaction) {
    // Check Permissions
    const MMP = PermissionsBitField.Flags.ManageMessages;
    if (!interaction.appPermissions.has(MMP))
      return await interaction.reply(
        content("Bot don't have permissions to execute this command.")
      );
    if (!interaction.memberPermissions.has(MMP))
      return await interaction.reply(
        content("User don't have permissions to execute this command.")
      );

    // Check requirement
    const amount = interaction.options.getInteger("amount");
    if (amount < 1 || amount > 20) {
      return interaction.reply(content("Amount must be between 1 and 20."));
    }

    // Execute
    await interaction.channel
      .bulkDelete(amount, true)
      .then(
        await interaction.reply(
          content(`Successfully cleaned \`${amount}\` messages.`)
        )
      )
      .catch((error) => {
        console.error(error);
        interaction.reply(
          content(
            "There was an error while trying to clean message in this channel!"
          )
        );
      });
  },
};
