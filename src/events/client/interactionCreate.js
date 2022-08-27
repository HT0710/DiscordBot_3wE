const { InteractionType, EmbedBuilder, Colors } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (!interaction.guild)
      return await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor(Colors.Yellow)
            .setTitle("**```Commands can only be used in servers!```**"),
        ],
      });

    const interactionType = () => {
      if (interaction.isChatInputCommand()) return "chatInputCommand";
      if (interaction.isButton()) return "button";
      if (interaction.isSelectMenu()) return "selectMenu";
      if (interaction.type === InteractionType.ModalSubmit)
        return "modalSubmit";
      if (interaction.isContextMenuCommand()) return "contextMenuCommand";
      if (interaction.type === InteractionType.ApplicationCommandAutocomplete)
        return "autocomplete";
    };

    const logError = async (error, name) => {
      console.error(error.message);
      await interaction.reply({
        content: `There was an error while executing ${name}!`,
        ephemeral: true,
      });
    };

    switch (interactionType()) {
      case "chatInputCommand": {
        const command = client.commands.get(interaction.commandName);

        if (!command) return;

        console.log(
          `${interaction.user.tag} in #${interaction.guild.name} triggered ${interaction}.`
        );

        try {
          await command.execute(interaction, client);
        } catch (error) {
          await logError(error, interaction.commandName);
        }
        break;
      }

      case "button": {
        const button = client.buttons.get(interaction.customId);

        if (!button) return console.error("There is no code for this button.");

        try {
          await button.execute(interaction, client);
        } catch (error) {
          await logError(error, interaction.commandName);
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
          await logError(error, interaction.commandName);
        }
        break;
      }

      case "modalSubmit": {
        const modal = client.modals.get(interaction.customId);

        if (!modal) return console.error("There is no code for this modal.");

        try {
          await modal.execute(interaction, client);
        } catch (error) {
          await logError(error, interaction.commandName);
        }
        break;
      }

      case "contextMenuCommand": {
        const contextCommand = client.commands.get(interaction.commandName);

        if (!contextCommand) return;

        console.log(
          `${interaction.user.tag} in #${interaction.guild.name} triggered [${interaction.commandName}].`
        );

        try {
          await contextCommand.execute(interaction, client);
        } catch (error) {
          await logError(error, interaction.commandName);
        }
        break;
      }

      case "autocomplete": {
        const command = client.commands.get(interaction.commandName);

        if (!command) return;

        try {
          await command.autocomplete(interaction, client);
        } catch (error) {
          await logError(error, interaction.commandName);
        }
        break;
      }

      default: {
        break;
      }
    }
  },
};
