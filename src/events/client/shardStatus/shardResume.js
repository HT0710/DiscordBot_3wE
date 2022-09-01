const chalk = require("chalk");

module.exports = {
  name: "shardResume",
  async execute(id, client) {
    console.log(`[Shard Status (${id})]:`, chalk.green(`Resumed`));
  },
};
