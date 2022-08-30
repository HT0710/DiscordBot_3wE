const chalk = require("chalk");

module.exports = {
  name: "connecting",
  execute() {
    console.log("[Database Status]:", chalk.yellow("Connecting..."));
  },
};
