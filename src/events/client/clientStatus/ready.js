const chalk = require("chalk");

module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    console.log("[Client Status]:", chalk.green("Ready"));

    client.pickPresence("online");
  },
};
