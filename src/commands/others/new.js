const { SlashCommandBuilder, EmbedBuilder, Colors } = require("discord.js");

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
            iconURL: `${client.application.owner.displayAvatarURL({
              dynamic: true,
              extension: "png",
              size: 4096,
            })}`,
            url: `https://github.com/HT0710`,
          })
          .setTitle("**v0.9@210822**")
          .setDescription(
            "- Add poll command\n- Add database\n- Move guilds to database\n- Minor change and update"
          )
          .setFooter({ text: "Date 21/08/2022" }),
      ],
    });
  },
};
