const { REST } = require("@discordjs/rest");
const chalk = require("chalk");
const { Routes } = require("discord.js");
const fs = require("fs");
require("dotenv").config();

module.exports = (client) => {
  client.handleCommands = async () => {
    const { commands, commandArray } = client;

    const commandsFolder = fs.readdirSync("./src/commands");
    for (const folder of commandsFolder) {
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        commands.set(command.data.name, command);
        commandArray.push(command.data.toJSON());
      }
    }

    const contextsFolder = fs.readdirSync("./src/commands/contexts");
    for (const folder of contextsFolder) {
      const contextsFiles = fs
        .readdirSync(`./src/commands/contexts/${folder}`)
        .filter((file) => file.endsWith(".js"));

      for (const file of contextsFiles) {
        const command = require(`../../commands/contexts/${folder}/${file}`);
        commands.set(command.data.name, command);
        commandArray.push(command.data.toJSON());
      }
    }

    const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

    await rest
      .put(Routes.applicationCommands(process.env.ID), {
        body: client.commandArray,
      })
      .then(() => console.log("[Command]:", chalk.green(`Ready`)))
      .catch((error) =>
        console.error(
          chalk.red("[REST API Error]:"),
          chalk.yellow(`${error.name}:`),
          error.message
        )
      );
  };
};
