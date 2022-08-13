const { fs } = require("../handlers/importHandle");

module.exports = (client, guild) => {
  console.log(`${client.user.tag} has joined #${guild.name} - ${guild.id}`);

  const file = fs.readFileSync("./src/json/config.json", "utf-8");
  const config = JSON.parse(file);

  config.guildId[guild.id] = {
    name: guild.name,
    prefix: { set: ">", activation: true },
  };

  fs.writeFile("./src/json/config.json", JSON.stringify(config), (err) => {
    if (err) throw err;
  });
};
