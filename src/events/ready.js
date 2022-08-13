const { ActivityType } = require("discord.js");

module.exports = (client) => {
  console.log(`${client.user.tag} was summoned! Ready to Die?`);
  client.user.setActivity("Free Fire | /help", {
    type: ActivityType.Playing,
  });
};
