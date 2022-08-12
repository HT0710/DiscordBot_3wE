const { Client, Collection, GatewayIntentBits } = require("discord.js");
const { fs, path, dotenv } = require("./handlers/importHandle");
dotenv.config();

const slashUpdate = true;
if (slashUpdate) require("./handlers/commandHandle");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
  ],
});
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

const ready = require("./events/ready");
client.once("ready", (client) => ready(client));

const guildCreate = require("./events/guildCreate");
client.on("guildCreate", (guild) => guildCreate(client, guild));

const interactionCreate = require("./events/interactionCreate");
client.on("interactionCreate", async (interaction) =>
  interactionCreate(client, interaction)
);

const messageCreate = require("./events/messageCreate");
client.on("messageCreate", async (message) => messageCreate(client, message));

client.login(process.env.TOKEN);
