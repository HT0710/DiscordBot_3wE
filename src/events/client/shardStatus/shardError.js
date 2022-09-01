const chalk = require("chalk");

module.exports = {
  name: "shardError",
  async execute(error, shardId, client) {
    console.log(`[Shard Status (${shardId})]:`, chalk.red("Error!"));
    console.error(error.message);
  },
};
