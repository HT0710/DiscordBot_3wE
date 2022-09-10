const { ActivityType, PresenceUpdateStatus } = require("discord.js");

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
        status: PresenceUpdateStatus.Online,
      },

      coding: {
        activities: [
          {
            name: "VS Code ⌨️ /help",
            type: ActivityType.Competing,
          },
        ],
        status: PresenceUpdateStatus.Idle,
      },

      toilet: {
        activities: [
          {
            name: "toilet 🚾 /help",
            type: ActivityType.Competing,
          },
        ],
        status: PresenceUpdateStatus.Idle,
      },

      chilling: {
        activities: [
          {
            name: "Metal Music 🔥 /help",
            type: ActivityType.Listening,
          },
        ],
        status: PresenceUpdateStatus.DoNotDisturb,
      },

      default: {
        activities: [
          {
            name: "You 🤨 /help",
            type: ActivityType.Watching,
          },
        ],
        status: PresenceUpdateStatus.Online,
      },
    };

    client.user.setPresence(types[option]);
  };
};
