const chalk = require("chalk");

module.exports = {
  name: "shardDisconnect",
  async execute(event, id, client) {
    console.error(`[Shard [${id}]]:`, chalk.magenta(`Disconnected`));
  },
};
