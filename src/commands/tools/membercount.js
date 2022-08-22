const { SlashCommandBuilder, EmbedBuilder, Colors } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("membercount")
    .setDescription("Return the total number of current members."),
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setColor(Colors.Yellow)
      .setTitle(`Total members: **\`${interaction.guild.memberCount}\`**`);

    await interaction.reply({ embeds: [embed] });
  },
};
