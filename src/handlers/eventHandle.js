const ready = require("../events/ready");
const guildCreate = require("../events/guildCreate");
const interactionCreate = require("../events/interactionCreate");
const messageCreate = require("../events/messageCreate");
const shardError = require("../events/shardError");

module.exports = (client) => {
  client.once("ready", (client) => ready(client));

  client.on("guildCreate", (guild) => guildCreate(client, guild));

  client.on("interactionCreate", async (interaction) =>
    interactionCreate(client, interaction)
  );

  client.on("messageCreate", async (message) => messageCreate(client, message));

  client.on("shardError", (error) => shardError(error));
};
