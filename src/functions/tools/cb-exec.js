const fs = require("fs");
const path = require("path");
const proc = require("child_process");

module.exports = (data) => {
  const content = `// import clipboard from "clipboardy"; clipboard.writeSync("${data}");`;

  fs.writeFileSync("./src/modules/copy-to-clipboard.js", content);
  const exec = path.join(__dirname, "../../modules/copy-to-clipboard.js");

  proc.execSync(`node ${exec}`);
};
