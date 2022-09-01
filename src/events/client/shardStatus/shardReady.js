const chalk = require("chalk");

module.exports = {
  name: "shardReady",
  async execute(id, client) {
    console.log(`[Shard Status (${id})]:`, chalk.green(`Connected`));
  },
};
