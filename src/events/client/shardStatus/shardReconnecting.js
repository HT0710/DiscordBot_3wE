const chalk = require("chalk");

module.exports = {
  name: "shardReconnecting",
  async execute(id, client) {
    console.log(`[Shard [${id}]]:`, chalk.yellow(`Reconnecting...`));
  },
};
