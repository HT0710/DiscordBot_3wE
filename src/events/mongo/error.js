const chalk = require("chalk");

module.exports = {
  name: "error",
  execute(error) {
    console.error(
      chalk.red("[Database Error]:"),
      chalk.yellow(`${error.name}:`),
      error.message
    );
  },
};
