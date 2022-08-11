const fs = require("node:fs");
const path = require("node:path");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord.js");
const { clientId } = require("../json/config.json");
const token = (() => {
  if (process.env.TOKEN === undefined) {
    const dotenv = require("dotenv");
    dotenv.config();
  }
  return process.env.TOKEN;
})();

const commands = [];
const commandsPath = path.join(__dirname, "../commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js") && file !== "AI.js");

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "10" }).setToken(token);

module.exports = rest
  .put(Routes.applicationCommands(clientId), { body: commands })
  .then(() => console.log(`Successfully updated.`))
  .catch(console.error);
