const chalk = require("chalk");

module.exports = {
  name: "shardReady",
  async execute(id, client) {
    console.log(`Shard's WebSocket id[${id}]:`, chalk.green(`Connected`));
  },
};
