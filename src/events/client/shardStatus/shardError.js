const chalk = require("chalk");

module.exports = {
  name: "shardError",
  async execute(error, shardId, client) {
    console.log(`Shard's WebSocket id[${shardId}]:`, chalk.red("Error!"));
    console.error(error);
  },
};
