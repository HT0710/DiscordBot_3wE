const chalk = require("chalk");

module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    console.log("[Client]:", chalk.green("Ready"));

    const presences = Object.keys(client.pickPresence);

    client.user.setPresence(
      client.pickPresence[presences[(presences.length * Math.random()) << 0]]
    );

    setInterval(
      () =>
        client.pickPresence[presences[(presences.length * Math.random()) << 0]],
      900000
    );
  },
};
