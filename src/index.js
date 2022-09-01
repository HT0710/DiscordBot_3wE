const { Client, Collection, Partials } = require("discord.js");
const { connect } = require("mongoose");
const fs = require("fs");
const chalk = require("chalk");
require("dotenv").config();

const client = new Client({
  intents: 3258319,
  partials: [
    Partials.Channel,
    Partials.GuildMember,
    Partials.GuildScheduledEvent,
    Partials.Message,
    Partials.Reaction,
    Partials.ThreadMember,
    Partials.User,
  ],
  allowedMentions: { parse: ["everyone", "roles", "users"] },
  rest: { timeout: 10000 },
});

client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();
client.commandArray = [];

const functionsFolder = fs.readdirSync("./src/functions");
for (const folder of functionsFolder) {
  const functionsFile = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));

  for (const file of functionsFile) {
    require(`./functions/${folder}/${file}`)(client);
  }
}

process.on("unhandledRejection", (error) =>
  console.error(
    chalk.red("[Unhandled Rejection]:"),
    chalk.yellow(`${error.name}:`),
    error.message
  )
);

client.handleEvents();
client.handleCommands();
client.handleComponents();

client.login(process.env.TOKEN);
(async () => {
  await connect(process.env.databaseTOKEN).catch((error) =>
    console.error(error)
  );
})();
