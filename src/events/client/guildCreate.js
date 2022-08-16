const fs = require("node:fs");

module.exports = {
  name: "guildCreate",
  async execute(guild, client) {
    console.log(`${client.user.tag} has joined #${guild.name} - ${guild.id}`);

    guild.systemChannel.send("I finally awaked. **`/help`** for the info.");

    const file = fs.readFileSync("./src/json/config.json", "utf-8");
    const config = JSON.parse(file);

    if (config.guildId[guild.id] !== undefined) return;

    config.guildId[guild.id] = {
      name: guild.name,
      prefix: { set: ">", activation: true },
    };

    fs.writeFile("./src/json/config.json", JSON.stringify(config), (err) => {
      if (err) throw err;
    });
  },
};
