const chalk = require("chalk");

module.exports = {
  name: "exit",
  execute(code, client) {
    console.log("Process exit with code:", code);
  },
};
