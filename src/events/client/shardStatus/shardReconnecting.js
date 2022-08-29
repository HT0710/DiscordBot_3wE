const chalk = require("chalk");

module.exports = {
  name: "shardReconnecting",
  async execute(id, client) {
    console.log(
      `Shard's WebSocket id[${id}]:`,
      chalk.yellow(`Reconnecting...`)
    );
  },
};
