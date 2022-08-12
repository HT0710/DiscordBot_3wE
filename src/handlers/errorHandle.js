const console = require("node:console");
const fs = require("node:fs");
let errorsFile = fs.readFileSync("./src/json/errors.json", "utf-8");
const errors = JSON.parse(errorsFile);
const date = new Date();

module.exports = (name, error) => {
  if (name === "other")
    errors[name].push({
      date: date.toLocaleDateString,
      time: date.toLocaleTimeString,
      error: error,
    });
  else
    errors.commands[name].push({
      date: date.toLocaleDateString,
      time: date.toLocaleTimeString,
      error: error,
    });

  fs.writeFile("./src/json/errors.json", JSON.stringify(errors), (err) => {
    if (err) throw err;
    console.log(`${name} error! Has been handled.`);
  });
};
