const {
  EmbedBuilder,
  Colors,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require("discord.js");

module.exports = {
  data: {
    name: "help-all-page_1",
  },
  async execute(interaction, client, reply) {
    const embed = new EmbedBuilder()
      .setColor(Colors.Gold)
      .setTitle("**All commands**")
      .setFooter({ text: "~ Page 1 ~" });

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

    for (let i = 0; i < 10; i++) {
      embed.addFields({
        name: `**\`/${commands[i].name}\`**`,
        value: `> ${commands[i].value}`,
      });
    }

    const next = new ButtonBuilder()
      .setCustomId("help-all-page_2")
      .setLabel("Next page")
      .setEmoji("➡️")
      .setStyle(ButtonStyle.Secondary);

    const page_1 = {
      embeds: [embed],
      components: [new ActionRowBuilder().addComponents(next)],
      ephemeral: true,
    };

    if (reply) return await interaction.reply(page_1);

    return await interaction.update(page_1);
  },
};
