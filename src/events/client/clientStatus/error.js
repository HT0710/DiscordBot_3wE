const chalk = require("chalk");

module.exports = {
  name: "error",
  async execute(error, client) {
    console.error(
      chalk.red(`[Client Error]:`),
      chalk.yellow(`${error.name}:`),
      error.message
    );
  },
};
