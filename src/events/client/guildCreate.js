const mongoose = require("mongoose");
const Guild = require("../../schemas/guild");
const imgFormat = require("../../components/functions/exports");

module.exports = {
  name: "guildCreate",
  async execute(guild, client) {
    console.log(`${client.user.tag} has joined #${guild.name}`);

    guild.systemChannel.send("I finally awaked. **`/help`** for the info.");

    if (await Guild.exists({ id: guild.id })) return;

    const setup = new Guild({
      _id: mongoose.Types.ObjectId(),
      id: guild.id,
      name: guild.name,
      iconURL: guild.iconURL() ? guild.iconURL(imgFormat) : null,
      ownerId: guild.ownerId,
    });

    await setup.save().catch((e) => console.error(e.message));
  },
};
