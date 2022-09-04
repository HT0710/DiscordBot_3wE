const chalk = require("chalk");
const { EmbedBuilder, Colors } = require("discord.js");
const mongoose = require("mongoose");
const Guild = require("../../../schemas/guild");

module.exports = {
  name: "guildCreate",
  async execute(guild, client) {
    console.log(
      "[Guild Status]:",
      `${client.user.tag} has ${chalk.green("joined")} @${guild.name}`
    );

    const embed = new EmbedBuilder()
      .setColor(Colors.Gold)
      .setTitle("**Try first command `/help`.**");

    await guild.systemChannel.send({ embeds: [embed] });

    if (await Guild.exists({ id: guild.id })) return;

    const setup = new Guild({
      _id: mongoose.Types.ObjectId(),
      id: guild.id,
      name: guild.name,
      iconURL: guild.iconURL()
        ? guild.iconURL({
            dynamic: true,
            extension: "png",
            size: 4096,
          })
        : null,
      ownerId: guild.ownerId,
    });

    await setup
      .save()
      .catch((error) =>
        console.error(
          chalk.red(`[Guild Create Error]:`),
          chalk.yellow(`${error.name}:`),
          error.message
        )
      );
  },
};
