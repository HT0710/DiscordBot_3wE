module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    const interactionType = () => {
      if (interaction.isChatInputCommand()) return "command";
      if (interaction.isButton()) return "button";
      if (interaction.isSelectMenu()) return "selectMenu";
    };

    switch (interactionType()) {
      case "command": {
        const command = client.commands.get(interaction.commandName);

        if (!command) return;

        console.log(
          `${interaction.user.tag} in #${interaction.guild.name} triggered ${interaction}.`
        );

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

      case "selectMenu": {
        const menu = client.selectMenus.get(interaction.customId);

        if (!menu) return;

        try {
          await menu.execute(interaction, client);
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
