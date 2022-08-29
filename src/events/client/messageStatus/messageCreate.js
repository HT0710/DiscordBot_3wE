let channelID = 0;
const Guild = require("../../../schemas/guild");
const content = (str) => ({
  content: str,
  ephemeral: true,
});

module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    // Check bot
    if (message.author.bot) return;

    const guild = await Guild.findOne({ id: message.guildId });
    const prefix = guild.prefix.current;

    // Check prefix activation
    if (!guild.prefix.activation) return;

    // Check does message startsWith prefix
    if (!message.content.startsWith(prefix)) return;

    // Get content
    const ctx = message.content.slice(1).split(" ");

    // Execute
    switch (ctx[0]) {
      case "test": {
        return await message.reply(content("test"));
      }

      case "speed": {
        return await message.delete();
      }

      case "setChannel": {
        channelID = ctx[1];
        return await message.reply(content("Done!"));
      }

      case "say": {
        if (channelID === 0)
          return await message.reply(
            content(`use ${prefix}setChannel [id of channel to say]`)
          );
        return await message.guild.channels.cache.get(channelID).send(ctx[1]);
      }

      case "admin": {
        if (message.author.id !== "779359246227472425") {
          return await message.reply(
            content("You don't have permissions to execute this command.")
          );
        }

        await message.delete();

        switch (ctx[1]) {
          case "get": {
            switch (ctx[2]) {
              case "config": {
                for (const id in config.guildId) {
                  console.log(`"${id}"`, ":", config.guildId[id], ",");
                }
                return;
              }

              default:
                return console.log("Get what?");
            }
          }

          default:
            return console.log("Need argument!");
        }
      }

      default:
        await message.reply(
          content(
            `${ctx.join(
              " "
            )}? Are you sure about that.\nTry using **\`/prefix\`**.`
          )
        );
    }
  },
};
