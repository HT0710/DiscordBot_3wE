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
          .setColor(Colors.Gold)
          .setAuthor({
            name: `By ${client.application.owner.tag}`,
            iconURL: `${client.application.owner.displayAvatarURL({
              dynamic: true,
              extension: "png",
              size: 4096,
            })}`,
            url: `https://github.com/HT0710`,
          })
          .setTitle("**v1.3@300822**")
          .setDescription(
            "```- Add invite to channel command\n- Update invite server command\n- Update help command\n- Update shard event\n- Improve avatar, clean, feedback, info, history commands\n- Other minor changes and updates```"
          )
          .setFooter({ text: "Date 30/08/2022" }),
      ],
    });
  },
};
