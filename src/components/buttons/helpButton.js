module.exports = {
  data: {
    name: `helpButton`,
  },
  async execute(interaction, client) {
    const helpInterface = require("../functions/helpInterface");
    return await interaction.update(helpInterface);
  },
};
