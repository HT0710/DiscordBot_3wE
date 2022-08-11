const exec = require("child_process").exec;
const path = require("node:path");
const fs = require("node:fs");

module.exports = SVD = async (interaction) => {
  const url = interaction.options.getAttachment("image").proxyURL;
  const value = interaction.options.getInteger("value").toString();
  fs.writeFileSync("./API.txt", url + "\n" + value);

  const pyExec = path.join(__dirname, "/py/SVD.py");
  exec(`python ${pyExec}`);
  setTimeout(() => {}, 2000);
  await interaction.reply("Wait a few second!").then(async () => {
    setTimeout(() => {
      interaction.channel.send(
        `Value:**\`${value}\`** - Remember the output is alway *Grayscale*.`
      );
      setTimeout(() => {
        interaction.channel.send({ files: ["./SVD.png"] });
      }, 4000);
    }, 2000);
  });
};
