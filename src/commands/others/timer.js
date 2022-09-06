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
        .setName("minute")
        .setDescription("Set minutes for your timer")
        .setMinValue(0)
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("hour")
        .setDescription("Set hours for your timer")
        .setMinValue(0)
        .setMaxValue(24)
    )
    .addIntegerOption((option) =>
      option
        .setName("second")
        .setDescription("Set seconds for your timer")
        .setMinValue(0)
    )
    .addStringOption((option) =>
      option.setName("description").setDescription("Set timer description")
    ),
  async execute(interaction, client) {
    await interaction.deferReply();

    const hour = interaction.options.getInteger("hour");
    const minute = interaction.options.getInteger("minute");
    const second = interaction.options.getInteger("second");
    const desc = interaction.options.getString("description");

    const timer = (hour * 3600 + minute * 60 + second + 1) * 1000;

    const timerEmbed = new EmbedBuilder()
      .setColor(Colors.Gold)
      .setTitle(
        `\`Timer ends\` ${time(new Date(new Date().getTime() + timer), "R")}`
      )
      .setDescription(desc ? `>>> ${desc}` : null);

    await interaction.editReply({ embeds: [timerEmbed] });

    setTimeout(async () => {
      const endedEmbed = new EmbedBuilder()
        .setTitle("`Timer has ended.`")
        .setDescription(desc ? `>>> ${desc}` : null);

      await interaction.editReply({ embeds: [endedEmbed] });

      const timeUpEmbed = new EmbedBuilder()
        .setColor(Colors.Gold)
        .setTitle("`Time up!`");

      await interaction.followUp({ embeds: [timeUpEmbed] });
    }, timer);
  },
};
