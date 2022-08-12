const { fs, path, dotenv } = require("./importHandle");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord.js");
const { clientId } = require("../json/config.json");
dotenv.config();

const commands = [];
const commandsPath = path.join(__dirname, "../commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

module.exports = rest
  .put(Routes.applicationCommands(clientId), { body: commands })
  .then(() => console.log(`Successfully updated.`))
  .catch(console.error);
