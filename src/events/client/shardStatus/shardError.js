const chalk = require("chalk");

module.exports = {
  name: "shardError",
  async execute(error, shardId, client) {
    console.error(
      chalk.red(`[Shard [${shardId}] Error]:`),
      chalk.yellow(`${error.name}:`),
      error.message
    );
  },
};
