const exec = require("child_process").exec;
const path = require("node:path");
const fs = require("node:fs");

module.exports = SVD = async (interaction) => {
  const url = interaction.options.getAttachment("image").proxyURL;
  const value = interaction.options.getInteger("value").toString();
  fs.writeFileSync("./API.txt", url + "\n" + value);

  const pyExec = path.join(__dirname, "/py/SVD.py");
  exec(`python ${pyExec}`);

  async function delay(mili) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(2);
      }, mili);
    });
  }

  (async () => {
    await delay(2000);
    await interaction.reply("Wait a few second!");
    await delay(3000);
    await interaction.channel.send(
      `Value:**\`${value}\`** - Remember the output is alway *Grayscale*.`
    );
    await delay(4000);
    await interaction.channel.send({ files: ["./SVD.png"] });
  })();
};
