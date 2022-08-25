const { ActivityType } = require("discord.js");

module.exports = (client) => {
  client.pickPresence = async (option) => {
    const types = {
      online: {
        activities: [
          {
            name: "Free Fire 🔥 /help",
            type: ActivityType.Playing,
          },
        ],
        status: "online",
      },

      default: {
        activities: [
          {
            name: "Curious 🤨 /help",
            type: ActivityType.Competing,
          },
        ],
        status: "online",
      },
    };

    client.user.setPresence(types[option]);
  };
};
