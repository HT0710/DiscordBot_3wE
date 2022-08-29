const { PermissionFlagsBits, EmbedBuilder, Colors } = require("discord.js");
const Guild = require("../../schemas/guild");

module.exports = {
  data: {
    name: `history-private-on`,
  },
  async execute(interaction, client) {
    const guild = await Guild.findOne({ id: interaction.guildId });
    const historyChannelId = guild.history;
    const historyChannel = await client.channels.cache.find(
      (channel) => channel.id === historyChannelId
    );

    await historyChannel.permissionOverwrites.edit(
      interaction.guild.roles.everyone,
      { [PermissionFlagsBits.ViewChannel]: false }
    );

    await interaction.update({
      embeds: [
        new EmbedBuilder()
          .setColor(Colors.Green)
          .setTitle(
            `\`\`\`${interaction.message.embeds[0].title} and 🔒 private.\`\`\``
          ),
      ],
      components: [],
    });
  },
};
