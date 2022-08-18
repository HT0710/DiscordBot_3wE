module.exports = {
  data: {
    name: "commandMenu",
  },
  async execute(interaction, client) {
    const commandCase = require("../functions/commandCase");
    return await commandCase(interaction, client, interaction.values[0]);
  },
};
