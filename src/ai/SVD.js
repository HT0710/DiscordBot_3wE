const { exec } = require("child_process");
const path = require("node:path");
const fs = require("node:fs");
const { count } = require("console");

module.exports = SVD = async (interaction) => {
  const url = interaction.options.getAttachment("image").proxyURL;
  const value = interaction.options.getInteger("value").toString();
  fs.writeFileSync("./API.txt", url + "\n" + value);

  const pyExec = path.join(__dirname, "/py/SVD.py");
  exec(`python3 ${pyExec}`);

  await interaction.reply("Wait a few second!");

  let check = "";
  (function loop() {
    setTimeout(() => {
      check = fs.readFileSync(
        `${path.join(__dirname, "../../API.txt")}`,
        "utf-8"
      );
      if (check !== "done") {
        loop();
      } else {
        interaction.channel.send({ files: ["./SVD.png"] });
      }
    }, 1000);
  })();
};
