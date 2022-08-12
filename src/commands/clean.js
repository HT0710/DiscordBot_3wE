const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");
const errorHandle = require("../handlers/errorHandle");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clean")
    .setDescription("Cleans the channel message up to 99.")
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("Amount of messages to clean.")
        .setRequired(true)
    ),
  async execute(interaction) {
    const pms = PermissionsBitField.Flags.ManageMessages;
    if (!interaction.appPermissions.has(pms))
      return await interaction.reply(
        "Bot don't have permissions to execute this command."
      );
    if (!interaction.memberPermissions.has(pms))
      return await interaction.reply(
        "User don't have permissions to execute this command."
      );

    const amount = interaction.options.getInteger("amount");

    if (amount < 1 || amount > 99) {
      return interaction.reply({
        content: "Amount must be between 1 and 99.",
        ephemeral: true,
      });
    }

    await interaction.channel.bulkDelete(amount, true).catch((error) => {
      errorHandle(interaction.commandName, error);
      interaction.reply({
        content:
          "There was an error while trying to clean message in this channel!",
        ephemeral: true,
      });
    });

    return await interaction.reply({
      content: `Successfully cleaned \`${amount}\` messages.`,
      ephemeral: true,
    });
  },
};
