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
    .addStringOption((option) => {
      option.setName("type").setDescription("Help on a command type.");

      const types = ["tools", "moderation", "music", "others", "all"];

      types.forEach((type) => option.addChoices({ name: type, value: type }));

      return option;
    })
    .addStringOption((option) => {
      option.setName("faq").setDescription("Frequently Asked Questions.");

      const questions = [
        "how to get channel id",
        "how to get message id",
        "how to get guild id",
        "poll timer format",
      ];

      questions.forEach((question) =>
        option.addChoices({ name: question, value: question })
      );

      return option;
    }),
  async execute(interaction, client) {
    const commandCase = require("../../components/functions/commandCase");
    const command = interaction.options.getString("command");
    if (command) return await commandCase(interaction, client, command);

    const typeCase = require("../../components/functions/typeCase");
    const type = interaction.options.getString("type");
    if (type) return await typeCase(interaction, client, type);

    const faqCase = require("../../components/functions/faqCase");
    const question = interaction.options.getString("faq");
    if (question) return await faqCase(interaction, client, question);

    const helpInterface = require("../../components/functions/helpInterface");
    return await interaction.reply(helpInterface);
  },
};
