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
              .setDescription(cmd.desc)
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
            .setColor(Colors.Gold)
            .setTitle("**Tools** - Provide server options")
            .setFooter({ text: "Page: 1/1" });

          tools.forEach((command) =>
            embed.addFields({
              name: `**\`/${command.name}\`**`,
              value: command.desc,
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
        (() => {
          const embed = new EmbedBuilder()
            .setColor(Colors.Gold)
            .setTitle(
              "**Moderation** - Options that have you to manage members"
            )
            .setFooter({ text: "Page: 1/1" });

          moderation.forEach((command) =>
            embed.addFields({
              name: `**\`/${command.name}\`**`,
              value: command.desc,
            })
          );

          return embed;
        })(),
      ],
      components: backButton ? [backButton] : [],
    },

    music: {
      embeds: [
        new EmbedBuilder()
          .setColor(Colors.Gold)
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
            .setColor(Colors.Gold)
            .setTitle("**Others** - My other additional commands")
            .setFooter({ text: "Page: 1/1" });

          others.forEach((command) =>
            embed.addFields({
              name: `**\`/${command.name}\`**`,
              value: command.desc,
            })
          );

          return embed;
        })(),
      ],
      components: backButton
        ? [commandMenu(others), backButton]
        : [commandMenu(others)],
    },
  };

  if (value === "all")
    return client.buttons
      .get("help-all-page_1")
      .execute(interaction, client, true);

  try {
    return await interaction.update(type[value]);
  } catch (error) {
    return await interaction.reply(type[value]);
  }
};
