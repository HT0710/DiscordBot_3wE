const {
  SlashCommandBuilder,
  EmbedBuilder,
  Colors,
  time,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("timer")
    .setDescription("Set timer.")
    .addIntegerOption((option) =>
      option
        .setName("hour")
        .setDescription("Set hour for your timer")
        .setMinValue(0)
        .setMaxValue(24)
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("minute")
        .setDescription("Set minute for your timer")
        .setMinValue(0)
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("second")
        .setDescription("Set second for your timer")
        .setMinValue(0)
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const hour = interaction.options.getInteger("hour");
    const minute = interaction.options.getInteger("minute");
    const second = interaction.options.getInteger("second");
    const timer = (hour * 3600 + minute * 60 + second + 1) * 1000;
    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setColor(Colors.Yellow)
          .setTitle(
            `Timer ${time(new Date(new Date().getTime() + timer), "R")}`
          )
          .setFooter({
            text: `by ${interaction.member.displayName}`,
            iconURL: interaction.member.displayAvatarURL(),
          })
          .setTimestamp(),
      ],
    });
    setTimeout(async () => {
      await interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setColor(Colors.Yellow)
            .setTitle(
              `Your ${hour === 0 ? "" : `${hour} h : `}${
                minute === 0 ? "" : `${minute}m : `
              }${second === 0 ? "" : `${second} s`} has ended!`
            ),
        ],
      });
      await interaction.followUp({
        embeds: [
          new EmbedBuilder().setColor(Colors.Yellow).setTitle("Time up!"),
        ],
      });
    }, timer);
  },
};
