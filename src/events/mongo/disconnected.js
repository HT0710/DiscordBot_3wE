const chalk = require("chalk");

module.exports = {
  name: "disconnected",
  execute() {
    console.log("[Database]:", chalk.magenta("Disconnected"));
  },
};
