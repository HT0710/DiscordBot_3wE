const { SlashCommandBuilder, EmbedBuilder, Colors } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("membercount")
    .setDescription("Return the total number of current members.")
    .addBooleanOption((option) =>
      option.setName("bot").setDescription("Including bots (Default: True)")
    ),
  async execute(interaction, client) {
    await interaction.deferReply();

    const guild = interaction.guild;
    let bot = interaction.options.getBoolean("bot");
    bot = bot === null ? true : bot;

    if (bot) memberCount = guild.memberCount;
    else
      memberCount = guild.members.cache.filter(
        (member) => !member.user.bot
      ).size;

    const embed = new EmbedBuilder()
      .setColor(Colors.Gold)
      .setTitle(`@${guild.name} has  total **\`${memberCount}\`** members`)
      .setFooter({ text: bot ? `Including bots` : `Bots are not included` })
      .setTimestamp();

    await interaction.editReply({ embeds: [embed] });
  },
};
