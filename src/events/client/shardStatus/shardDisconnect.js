const chalk = require("chalk");

module.exports = {
  name: "shardDisconnect",
  async execute(event, id, client) {
    console.error(`[Shard Status (${id})]:`, chalk.magenta(`Disconnected`));
  },
};
