const {
  ActionRowBuilder,
  ButtonStyle,
  ButtonBuilder,
  EmbedBuilder,
  Colors,
} = require("discord.js");

module.exports = {
  data: {
    name: "help-all-page_2",
  },
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setColor(Colors.Yellow)
      .setTitle("**All commands**")
      .setFooter({ text: "~ Page 2 ~" });

    let commands = [];
    const helpList = require("../../../json/help.json");
    for (const type in helpList) {
      helpList[type].forEach((command) => {
        commands.push({
          name: command.name,
          value: command.desc,
        });
      });
    }

    commands.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));

    for (let i = 10; i < commands.length; i++) {
      embed.addFields({
        name: `**\`/${commands[i].name}\`**`,
        value: `> ${commands[i].value}`,
      });
    }

    const back = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("help-all-page_1")
        .setLabel("Previous page")
        .setEmoji("⬅️")
        .setStyle(ButtonStyle.Secondary)
    );

    return await interaction.update({
      embeds: [embed],
      components: [back],
    });
  },
};
