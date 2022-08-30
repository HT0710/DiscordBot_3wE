const chalk = require("chalk");

module.exports = {
  name: "disconnected",
  execute() {
    console.log("[Database Status]:", chalk.magenta("Disconnected"));
  },
};
