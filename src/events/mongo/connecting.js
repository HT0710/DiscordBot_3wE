const chalk = require("chalk");

module.exports = {
  name: "connecting",
  execute() {
    console.log("[Database]:", chalk.yellow("Connecting..."));
  },
};
