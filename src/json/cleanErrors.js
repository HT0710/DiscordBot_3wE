const fs = require("node:fs");
let errorsFile = fs.readFileSync("./src/json/errors.json", "utf-8");
const errors = JSON.parse(errorsFile);

let name = "other";

if (name === "other") errors[name] = [];
else if (!errors.commands.hasOwnProperty(name))
  return console.log(name, "not found!");
else errors.commands[name] = [];

fs.writeFile("./src/json/errors.json", JSON.stringify(errors), (err) => {
  if (err) throw err;
  console.log(`${name} error! Has been cleaned.`);
});
