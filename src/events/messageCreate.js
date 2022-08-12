let channelID = 0;
module.exports = async (client, message) => {
  if (message.author.bot) return;

  const config = require("../json/config.json");
  const prefix = config.guildId[message.guildId].prefix.set;
  if (!message.content.startsWith(prefix)) return;

  const ctx = message.content.slice(1).split(" ");

  switch (ctx[0]) {
    case "test":
      (async () => {
        await message.reply("test");
      })();
      break;

    case "setChannel":
      (async () => {
        channelID = ctx[1];
        await message.reply("Done!");
      })();
      break;

    case "say":
      (async () => {
        if (channelID === 0)
          return await message.reply({
            content: `use ${prefix}setChannel [id of channel to say]`,
            ephemeral: true,
          });
        await message.guild.channels.cache.get(channelID).send(ctx[1]);
      })();
      break;

    default:
      await message.reply(`${ctx.join(" ")}? Are you sure about that.`);
      await message.channel.send("Try using **`/prefix`**.");
  }
};
