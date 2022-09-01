const chalk = require("chalk");

module.exports = {
  name: "error",
  execute(error) {
    console.log("[Database Status]:", chalk.red("Error!"));
    console.error(error.message);
  },
};
