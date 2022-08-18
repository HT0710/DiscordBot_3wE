const { SlashCommandBuilder } = require("discord.js");

const commandList = [];
const commands = require("../../json/help.json");
for (const type in commands)
  commands[type].forEach((command) => commandList.push(command.name));

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Shows info about 3wE commands.")
    .addStringOption((option) => {
      option.setName("command").setDescription("Help on a specific command.");
      commandList.sort().forEach((command) =>
        option.addChoices({
          name: command,
          value: command,
        })
      );
      return option;
    })
    .addStringOption((option) =>
      option
        .setName("type")
        .setDescription("Help on a command type.")
        .setChoices(
          {
            name: "tools",
            value: "tools",
          },
          {
            name: "moderation",
            value: "moderation",
          },
          {
            name: "music",
            value: "music",
          },
          {
            name: "others",
            value: "others",
          },
          {
            name: "all",
            value: "all",
          }
        )
    ),
  async execute(interaction, client) {
    const commandCase = require("../../components/functions/commandCase");
    const command = interaction.options.getString("command");
    if (command) return await commandCase(interaction, client, command);

    const typeCase = require("../../components/functions/typeCase");
    const type = interaction.options.getString("type");
    if (type) return await typeCase(interaction, client, type);

    const helpInterface = require("../../components/functions/helpInterface");
    return await interaction.reply(helpInterface);
  },
};
