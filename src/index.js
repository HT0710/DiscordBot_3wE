const { Client, Collection, GatewayIntentBits } = require("discord.js");
const { fs, path, dotenv } = require("./handlers/importHandle");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
  ],
});

const addCommand = (() => {
  client.commands = new Collection();
  client.commandArray = [];

  const commandsPath = path.join(__dirname, "./commands");
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.commands.set(command.data.name, command);
  }
})();

const execute = (() => {
  const commandHandle = require("./handlers/commandHandle");
  const eventHandle = require("./handlers/eventHandle")(client);
})();

client.login(process.env.TOKEN);
