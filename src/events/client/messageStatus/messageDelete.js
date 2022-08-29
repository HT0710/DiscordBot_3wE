const Guild = require("../../../schemas/guild");

module.exports = {
  name: "messageDelete",
  async execute(message, client) {
    const guild = await Guild.findOne({ id: message.guildId });
    const historyChannelId = guild.history;

    if (!historyChannelId) return;
    if (historyChannelId === message.channelId) return;

    const historyChannel = client.channels.cache.find(
      (channel) => channel.id == historyChannelId
    );

    await historyChannel.send(message);
  },
};
