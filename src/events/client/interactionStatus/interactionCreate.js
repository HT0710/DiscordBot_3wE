const chalk = require("chalk");
const { InteractionType, EmbedBuilder, Colors } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (!interaction.guild) {
      const preventEmbed = new EmbedBuilder()
        .setColor(Colors.Red)
        .setTitle("**```Commands can only be used in servers!```**");

      return await interaction.reply({
        embeds: [preventEmbed],
        ephemeral: true,
      });
    }

    const logError = async (error, name) => {
      console.error(
        chalk.red("[Interaction Error]:"),
        chalk.yellow(`${name}:`),
        error
      );

      const errorEmbed = new EmbedBuilder()
        .setColor(Colors.Red)
        .setTitle(`\`An error occurred while executing the command ${name}!\``);

      if (interaction.deferred)
        return await interaction.editReply({
          embeds: [errorEmbed],
          ephemeral: true,
        });

      await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    };

    const interactionType = (() => {
      if (interaction.isChatInputCommand()) return "chatInputCommand";
      if (interaction.isButton()) return "button";
      if (interaction.isSelectMenu()) return "selectMenu";
      if (interaction.type === InteractionType.ModalSubmit)
        return "modalSubmit";
      if (interaction.isContextMenuCommand()) return "contextMenuCommand";
      if (interaction.type === InteractionType.ApplicationCommandAutocomplete)
        return "autocomplete";
    })();

    switch (interactionType) {
      case "chatInputCommand": {
        const command = client.commands.get(interaction.commandName);

        if (!command) return;

        console.log(
          "[Interaction]:",
          `${interaction.user.tag} in @${interaction.guild.name} ${chalk.cyan(
            "triggered"
          )} ${interaction}`
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

        if (!button)
          return console.error(
            "[Interaction]:",
            chalk.gray("There is no code for this Button.")
          );

        try {
          await button.execute(interaction, client);
        } catch (error) {
          await logError(error, interaction.customId);
        }
        break;
      }

      case "selectMenu": {
        const menu = client.selectMenus.get(interaction.customId);

        if (!menu)
          return console.error(
            "[Interaction]:",
            chalk.gray("There is no code for this Menu Selection.")
          );

        try {
          await menu.execute(interaction, client);
        } catch (error) {
          await logError(error, interaction.customId);
        }
        break;
      }

      case "modalSubmit": {
        const modal = client.modals.get(interaction.customId);

        if (!modal)
          return console.error(
            "[Interaction]:",
            chalk.gray("There is no code for this Modal.")
          );

        try {
          await modal.execute(interaction, client);
        } catch (error) {
          await logError(error, interaction.customId);
        }
        break;
      }

      case "contextMenuCommand": {
        const contextCommand = client.commands.get(interaction.commandName);

        if (!contextCommand) return;

        console.log(
          "[Interaction]:",
          `${interaction.user.tag} in @${interaction.guild.name} ${chalk.cyan(
            "triggered"
          )} [${interaction.commandName}]`
        );

        try {
          await contextCommand.execute(interaction, client);
        } catch (error) {
          await logError(error, `[${interaction.commandName}]`);
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
