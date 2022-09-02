const chalk = require("chalk");

module.exports = {
  name: "warning",
  execute(warning, client) {
    console.warn(
      chalk.red("[Warning]:"),
      chalk.yellow(`${warning.name}:`),
      warning.message
    );
  },
};
