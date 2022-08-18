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
          .setTitle("**v0.8@190822**")
          .setDescription(
            "- Add select menu\n- Add new command\n- Update help command v2.0\n- Minor change on avatar, prefix, ping command\n- Optimize & Organize"
          )
          .setFooter({ text: "At 19/08/2022" }),
      ],
    });
  },
};
