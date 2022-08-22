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
          .setTitle("**v1.0@230822**")
          .setDescription(
            "- Add context menu command\n- Add info command\n- Add membercount command"
          )
          .setFooter({ text: "Date 23/08/2022" }),
      ],
    });
  },
};
