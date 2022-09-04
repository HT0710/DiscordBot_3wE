const chalk = require("chalk");

module.exports = {
  name: "unhandledRejection",
  execute(reason, promise, client) {
    console.error(
      chalk.red("[Unhandled Rejection]:"),
      chalk.yellow(`${reason.name}:`),
      reason.message
    );
  },
};
