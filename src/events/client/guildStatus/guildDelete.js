const chalk = require("chalk");

module.exports = {
  name: "guildDelete",
  async execute(guild, client) {
    console.log(
      "[Guild Status]:",
      `${client.user.tag} has been ${chalk.magenta("kicked")} out of @${
        guild.name
      }`
    );
  },
};
