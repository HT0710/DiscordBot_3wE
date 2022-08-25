const { SlashCommandBuilder, EmbedBuilder, Colors } = require("discord.js");
const { imgFormat } = require("../../components/functions/exports");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("new")
    .setDescription("Show recent 3wE update."),
  async execute(interaction, client) {
    await client.application.fetch();
    return await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setColor(Colors.Yellow)
          .setAuthor({
            name: `By ${client.application.owner.tag}`,
            iconURL: `${client.application.owner.displayAvatarURL(imgFormat)}`,
            url: `https://github.com/HT0710`,
          })
          .setTitle("**v1.1@260822**")
          .setDescription(
            "- Add autocomplete\n- Add history command\n- Update poll command\n- Update bot presence\n- Other minor changes and updates"
          )
          .setFooter({ text: "Date 26/08/2022" }),
      ],
    });
  },
};
