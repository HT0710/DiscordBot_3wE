const chalk = require("chalk");

module.exports = {
  name: "shardResume",
  async execute(id, client) {
    console.log(`Shard's WebSocket id[${id}]:`, chalk.green(`Resumed`));
  },
};
