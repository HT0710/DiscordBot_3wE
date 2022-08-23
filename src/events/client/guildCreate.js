const mongoose = require("mongoose");
const Guild = require("../../schemas/guild");
const imgFormat = require("../../components/functions/exports");

module.exports = {
  name: "guildCreate",
  async execute(guild, client) {
    console.log(`${client.user.tag} has joined #${guild.name}`);

    guild.systemChannel.send("I finally awaked. **`/help`** for the info.");

    if (await Guild.exists({ id: interaction.guild.id })) return;

    const setup = new Guild({
      _id: mongoose.Types.ObjectId(),
      id: interaction.guild.id,
      name: interaction.guild.name,
      iconURL: interaction.guild.iconURL()
        ? interaction.guild.iconURL(imgFormat)
        : null,
      ownerId: interaction.guild.ownerId,
      prefix: {
        current: ">",
        activation: true,
      },
    });

    await setup.save().catch((e) => console.error(e.message));
  },
};
