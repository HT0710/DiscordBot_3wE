const { REST } = require("@discordjs/rest");
const { Routes } = require("discord.js");
const fs = require("fs");
require("dotenv").config();

module.exports = (client) => {
  client.handleCommands = async () => {
    const commandsFolder = fs.readdirSync("./src/commands");
    for (const folder of commandsFolder) {
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      const { commands, commandArray } = client;
      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        commands.set(command.data.name, command);
        commandArray.push(command.data.toJSON());
      }
    }

    const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

    await rest
      .put(Routes.applicationCommands(process.env.ID), {
        body: client.commandArray,
      })
      .then(() => console.log(`Successfully updated.`))
      .catch((err) => console.error(err.message));
  };
};
