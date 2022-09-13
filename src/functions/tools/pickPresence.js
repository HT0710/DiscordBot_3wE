const { ActivityType, PresenceUpdateStatus } = require("discord.js");

module.exports = (client) => {
  client.pickPresence = {
    online: {
      activities: [
        {
          name: "Free Fire 🔥 /help",
          type: ActivityType.Playing,
        },
      ],
      status: PresenceUpdateStatus.Online,
    },

    playing_2: {
      activities: [
        {
          name: "Cyberpunk 2077 👽 /help",
          type: ActivityType.Playing,
        },
      ],
      status: PresenceUpdateStatus.Online,
    },

    valorant: {
      activities: [
        {
          name: "Valorant 🔫 /help",
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
          name: "Toilet 🚾 /help",
          type: ActivityType.Competing,
        },
      ],
      status: PresenceUpdateStatus.Idle,
    },

    lol: {
      activities: [
        {
          name: "LoL 🎮 /help",
          type: ActivityType.Competing,
        },
      ],
      status: PresenceUpdateStatus.DoNotDisturb,
    },

    chilling: {
      activities: [
        {
          name: "Metal ❤️‍🔥 /help",
          type: ActivityType.Listening,
        },
      ],
      status: PresenceUpdateStatus.DoNotDisturb,
    },

    lofi: {
      activities: [
        {
          name: "chill lofi 🌌 /help",
          type: ActivityType.Listening,
        },
      ],
      status: PresenceUpdateStatus.Idle,
    },

    chilling: {
      activities: [
        {
          name: "MMORPG 🧙‍♂️ /help",
          type: ActivityType.Streaming,
        },
      ],
      status: PresenceUpdateStatus.DoNotDisturb,
    },

    youtube: {
      activities: [
        {
          name: "youtube ▶️ /help",
          type: ActivityType.Streaming,
        },
      ],
      status: PresenceUpdateStatus.DoNotDisturb,
    },

    default: {
      activities: [
        {
          name: "You 🤨📸 /help",
          type: ActivityType.Watching,
        },
      ],
      status: PresenceUpdateStatus.Online,
    },
  };
};
