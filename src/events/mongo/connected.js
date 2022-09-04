const chalk = require("chalk");

module.exports = {
  name: "connected",
  execute() {
    console.log("[Database]:", chalk.green("Connected"));
  },
};
