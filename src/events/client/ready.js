const { ActivityType } = require("discord.js");

module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    console.log(`${client.user.tag} was summoned! Ready to Die?`);
    client.user.setActivity("Free Fire | /help", {
      type: ActivityType.Playing,
    });
  },
};
