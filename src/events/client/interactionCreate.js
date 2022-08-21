const { InteractionType } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    const interactionType = () => {
      if (interaction.isChatInputCommand()) return "command";
      if (interaction.isButton()) return "button";
      if (interaction.isSelectMenu()) return "selectMenu";
      if ((interaction.type = InteractionType.ModalSubmit)) return "modal";
    };

    const logError = async (error) => {
      console.error(error);
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
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
          await logError(error);
        }
        break;
      }

      case "button": {
        const button = client.buttons.get(interaction.customId);

        if (!button) return console.error("There is no code for this button.");

        try {
          await button.execute(interaction, client);
        } catch (error) {
          await logError(error);
        }
        break;
      }

      case "selectMenu": {
        const menu = client.selectMenus.get(interaction.customId);

        if (!menu)
          return console.error("There is no code for this select menu.");

        try {
          await menu.execute(interaction, client);
        } catch (error) {
          await logError(error);
        }
        break;
      }

      case "modal": {
        const modal = client.modals.get(interaction.customId);

        if (!modal) return console.error("There is no code for this modal.");

        try {
          await modal.execute(interaction, client);
        } catch (error) {
          await logError(error);
        }
        break;
      }

      default: {
        break;
      }
    }
  },
};
