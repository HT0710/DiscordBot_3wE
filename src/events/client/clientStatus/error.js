const chalk = require("chalk");

module.exports = {
  name: "error",
  async execute(error, client) {
    console.log(chalk.red(`[Uncaught Error]:`), error.message);
  },
};
