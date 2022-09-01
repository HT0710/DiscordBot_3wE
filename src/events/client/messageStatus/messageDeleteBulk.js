const Guild = require("../../../schemas/guild");

module.exports = {
  name: "messageDeleteBulk",
  async execute(messages, channel, client) {
    const guild = await Guild.findOne({ id: channel.guildId });
    const historyChannelId = guild.history;

    if (!historyChannelId) return;
    if (historyChannelId === channel.id) return;

    const historyChannel = client.channels.cache.find(
      (channel) => channel.id == historyChannelId
    );

    messages.forEach(
      async (message) =>
        await historyChannel.send(message).catch((e) => {
          message.nonce = Math.random().toString().slice(2);

          historyChannel.send(message).catch((e) => console.log(e.message));
        })
    );
  },
};
