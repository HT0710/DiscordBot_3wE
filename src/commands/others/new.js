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
          .setTitle("**v1.2@280822**")
          .setDescription(
            "```- Add timer command\n- Add save command\n- Add send command\n- Add help faq\n- Remove ai command\n- Other minor changes and updates```"
          )
          .setFooter({ text: "Date 28/08/2022" }),
      ],
    });
  },
};
