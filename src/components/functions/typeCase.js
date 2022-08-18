const {
  ActionRowBuilder,
  SelectMenuBuilder,
  SelectMenuOptionBuilder,
  EmbedBuilder,
  Colors,
} = require("discord.js");

const { tools, moderation, music, others } = require("../../json/help.json");

module.exports = async (interaction, client, value, backButton) => {
  const commandMenu = (list) =>
    new ActionRowBuilder().addComponents(
      (() => {
        const menu = new SelectMenuBuilder()
          .setCustomId("commandMenu")
          .setMinValues(1)
          .setMaxValues(1)
          .setPlaceholder("Select an option.");

        list.forEach((cmd) =>
          menu.addOptions(
            new SelectMenuOptionBuilder()
              .setLabel(cmd.name)
              .setDescription(cmd.dis)
              .setValue(cmd.name)
          )
        );
        return menu;
      })()
    );

  const type = {
    tools: {
      embeds: [
        (() => {
          const embed = new EmbedBuilder()
            .setColor(Colors.Yellow)
            .setTitle("**Tools** - Provide server options")
            .setFooter({ text: "Page: 1/1" });

          tools.forEach((command) =>
            embed.addFields({
              name: `**\`/${command.name}\`**`,
              value: command.dis,
            })
          );

          return embed;
        })(),
      ],
      components: backButton
        ? [commandMenu(tools), backButton]
        : [commandMenu(tools)],
    },

    moderation: {
      embeds: [
        new EmbedBuilder()
          .setColor(Colors.Yellow)
          .setTitle("**Moderation** - Options that have you to manage members")
          // .addFields()
          .setFooter({ text: "Page: 1/1" }),
      ],
      components: backButton ? [backButton] : [],
    },

    music: {
      embeds: [
        new EmbedBuilder()
          .setColor(Colors.Yellow)
          .setTitle("**Music** - Control bot's music player")
          // .addFields()
          .setFooter({ text: "Page: 1/1" }),
      ],
      components: backButton ? [backButton] : [],
    },

    others: {
      embeds: [
        (() => {
          const embed = new EmbedBuilder()
            .setColor(Colors.Yellow)
            .setTitle("**Others** - My other additional commands")
            .setFooter({ text: "Page: 1/1" });

          others.forEach((command) =>
            embed.addFields({
              name: `**\`/${command.name}\`**`,
              value: command.dis,
            })
          );

          return embed;
        })(),
      ],
      components: backButton
        ? [commandMenu(others), backButton]
        : [commandMenu(others)],
    },

    all: {
      embeds: [
        (() => {
          const embed = new EmbedBuilder()
            .setColor(Colors.Yellow)
            .setTitle("**All commands**")
            .setFooter({ text: "Page: 1/1" });

          let commands = [];
          const helpList = require("../../json/help.json");
          for (const type in helpList) {
            helpList[type].forEach((command) => {
              commands.push({ name: command.name, value: command.dis });
            });
          }

          commands.sort((a, b) =>
            a.name > b.name ? 1 : b.name > a.name ? -1 : 0
          );

          commands.forEach((command) => embed.addFields(command));

          return embed;
        })(),
      ],
      components: backButton ? [backButton] : [],
    },
  };

  try {
    return await interaction.update(type[value]);
  } catch (error) {
    return await interaction.reply(type[value]);
  }
};
