module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    const interactionType = () => {
      if (interaction.isChatInputCommand()) return "command";
      if (interaction.isButton()) return "button";
    };

    switch (interactionType()) {
      case "command": {
        console.log(
          `${interaction.user.tag} in #${interaction.guild.name} triggered ${interaction}.`
        );

        const command = client.commands.get(interaction.commandName);

        if (!command) return;

        try {
          await command.execute(interaction, client);
        } catch (error) {
          console.error(error);
          await interaction.reply({
            content: "There was an error while executing this command!",
            ephemeral: true,
          });
        }
        break;
      }

      case "button": {
        const button = client.buttons.get(interaction.customId);

        if (!button) return;

        try {
          await button.execute(interaction, client);
        } catch (error) {
          console.error(error);
          await interaction.reply({
            content: "There was an error while executing this command!",
            ephemeral: true,
          });
        }
        break;
      }
    }
  },
};
