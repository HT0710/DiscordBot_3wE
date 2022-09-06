const {
  SlashCommandBuilder,
  EmbedBuilder,
  Colors,
  time,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("reminder")
    .setDescription("Remind you after time.")
    .addStringOption((option) =>
      option
        .setName("content")
        .setDescription("Set reminder content")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("minute")
        .setDescription("Set minutes for reminder")
        .setMinValue(0)
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("hour")
        .setDescription("Set hours for reminder")
        .setMinValue(0)
        .setMaxValue(24)
    )
    .addIntegerOption((option) =>
      option
        .setName("second")
        .setDescription("Set seconds for reminder")
        .setMinValue(0)
    ),
  async execute(interaction, client) {
    await interaction.deferReply({ ephemeral: true });

    const content = interaction.options.getString("content");
    const hour = interaction.options.getInteger("hour");
    const minute = interaction.options.getInteger("minute");
    const second = interaction.options.getInteger("second");
    const timer = (hour * 3600 + minute * 60 + second + 1) * 1000;

    const reminderEmbed = new EmbedBuilder()
      .setColor(Colors.Gold)
      .setTitle(
        `\`Reminder\` ${time(new Date(new Date().getTime() + timer), "R")}`
      )
      .setDescription(`>>> ${content}`)
      .setFooter({ text: "Make sure your DM is open for notification!" });
    await interaction.editReply({ embeds: [reminderEmbed] });

    setTimeout(async () => {
      try {
        const remindedEmbed = new EmbedBuilder()
          .setColor(Colors.Gold)
          .setTitle(`>>> ${content}`)
          .setFooter({ text: `From ${client.user.username} /reminder` });
        await interaction.member.send({ embeds: [remindedEmbed] });

        const endedEmbed = new EmbedBuilder().setTitle("`Reminded!`");
        await interaction.editReply({ embeds: [endedEmbed] });
      } catch (error) {
        const errorEmbed = new EmbedBuilder()
          .setColor(Colors.Red)
          .setTitle("`An error occurred while sending this message!`")
          .setDescription(
            ">>> Check your privacy setting and try again later."
          );
        await interaction.followUp({ embeds: [errorEmbed], ephemeral: true });
      }
    }, timer);
  },
};
