const {
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  Colors,
  SelectMenuBuilder,
  SelectMenuOptionBuilder,
} = require("discord.js");

const { tools, moderation, music, others } = require("../../json/help.json");

module.exports = {
  data: {
    name: `helpMenu`,
  },
  async execute(interaction, client) {
    const backButton = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("helpButton")
        .setEmoji("◀️")
        .setLabel("Back to the selection.")
        .setStyle(ButtonStyle.Secondary)
    );
    const commandMenu = (commandList) =>
      new ActionRowBuilder().addComponents(
        (() => {
          const menu = new SelectMenuBuilder()
            .setCustomId("commandMenu")
            .setMinValues(1)
            .setMaxValues(1)
            .setPlaceholder("Select an option.");

          commandList.forEach((cmd) =>
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

    switch (interaction.values[0]) {
      case "tools": {
        return await interaction.update({
          embeds: [
            new EmbedBuilder()
              .setColor(Colors.Yellow)
              .setTitle("Tools - Provide server options.")
              .addFields(
                {
                  name: `**\`/${tools[0].name}\`**`,
                  value: tools[0].dis,
                },
                {
                  name: `**\`/${tools[1].name}\`**`,
                  value: tools[1].dis,
                },
                {
                  name: `**\`/${tools[2].name}\`**`,
                  value: tools[2].dis,
                },
                {
                  name: `**\`/${tools[3].name}\`**`,
                  value: tools[3].dis,
                },
                {
                  name: `**\`/${tools[4].name}\`**`,
                  value: tools[4].dis,
                }
              )
              .setFooter({ text: "Page: 1/1" }),
          ],
          components: [commandMenu(tools), backButton],
        });
      }

      case "moderation": {
        return await interaction.update({
          embeds: [
            new EmbedBuilder()
              .setColor(Colors.Yellow)
              .setTitle("Moderation - Options that have you to manage members.")
              // .addFields()
              .setFooter({ text: "Page: 1/1" }),
          ],
          components: [backButton],
        });
      }

      case "music": {
        return await interaction.update({
          embeds: [
            new EmbedBuilder()
              .setColor(Colors.Yellow)
              .setTitle("Music - Control bot's music player.")
              // .addFields()
              .setFooter({ text: "Page: 1/1" }),
          ],
          components: [backButton],
        });
      }

      case "others": {
        return await interaction.update({
          embeds: [
            new EmbedBuilder()
              .setColor(Colors.Yellow)
              .setTitle("Others - My other additional commands.")
              .addFields({
                name: `**\`/${others[0].name}\`**`,
                value: others[0].dis,
              })
              .setFooter({ text: "Page: 1/1" }),
          ],
          components: [commandMenu(others), backButton],
        });
      }
    }
  },
};
