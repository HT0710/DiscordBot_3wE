const { EmbedBuilder } = require("discord.js");

module.exports = {
  done: new EmbedBuilder().setColor("Green").setTitle("`Done!`"),
  sendingError: new EmbedBuilder()
    .setColor("Red")
    .setTitle("`An error occurred while sending this message!`"),
  permissionError: (name) =>
    new EmbedBuilder()
      .setColor("Red")
      .setTitle(
        `\`Bot don't have [${name}] permission to execute this command.\``
      ),
};
