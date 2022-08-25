const { PermissionFlagsBits } = require("discord.js");
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

    await historyChannel.permissionOverwrites.create(
      interaction.guild.roles.everyone,
      { [PermissionFlagsBits.ViewChannel]: false }
    );

    const message = await interaction.message;
    await interaction.update({
      content: `${message.content.split("\n")[0]} and 🔒**\`private\`**`,
      components: [],
    });
  },
};
