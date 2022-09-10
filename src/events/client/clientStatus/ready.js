const chalk = require("chalk");

module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    console.log("[Client]:", chalk.green("Ready"));

    const presences = ["online", "coding", "chilling", "toilet", "default"];

    client.pickPresence(
      presences[Math.floor(Math.random() * presences.length)]
    );

    setInterval(
      () =>
        client.pickPresence(
          presences[Math.floor(Math.random() * presences.length)]
        ),
      900000
    );
  },
};
