const chalk = require("chalk");

module.exports = {
  name: "shardResume",
  async execute(id, client) {
    console.log(`[Shard [${id}]]:`, chalk.green(`Resumed`));
  },
};
