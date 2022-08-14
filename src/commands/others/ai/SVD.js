const exec = require("child_process").exec;
const path = require("node:path");
const fs = require("node:fs");

module.exports = SVD = async (interaction) => {
  const url = interaction.options.getAttachment("image").proxyURL;
  const value = interaction.options.getInteger("value").toString();
  fs.writeFileSync(
    "./src/commands/others/ai/resources/API.txt",
    url + "\n" + value
  );

  const pyExec = path.join(__dirname, "/python/SVD.py");
  exec(`python3 ${pyExec}`);

  await interaction.deferReply();

  let check = "";
  (function loop() {
    setTimeout(() => {
      check = fs.readFileSync(
        `${path.join(__dirname, "./resources/API.txt")}`,
        "utf-8"
      );
      if (check !== "done") {
        loop();
      } else {
        interaction.editReply({
          content: "",
          files: ["./src/commands/others/ai/resources/SVD.png"],
        });
      }
    }, 1000);
  })();
};
