module.exports = async (client, interaction) => {
  if (!interaction.isChatInputCommand()) return;

  console.log(
    `${interaction.user.tag} in #${interaction.guild.name} triggered ${interaction}.`
  );

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
};
