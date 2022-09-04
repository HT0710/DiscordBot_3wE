const chalk = require("chalk");

module.exports = {
  name: "uncaughtException",
  execute(error, client) {
    console.error(
      chalk.red("[Uncaught Exception]:"),
      chalk.yellow(`${error.name}:`),
      error.message
    );
  },
};
