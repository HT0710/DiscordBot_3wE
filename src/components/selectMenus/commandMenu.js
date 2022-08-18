const commandList = require("../../commands/tools/functions/commandList");

module.exports = {
  data: {
    name: "commandMenu",
  },
  async execute(interaction, client) {
    return await commandList(interaction, client, interaction.values[0]);
  },
};
