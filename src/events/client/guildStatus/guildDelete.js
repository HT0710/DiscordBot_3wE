module.exports = {
  name: "guildDelete",
  async execute(guild, client) {
    console.log(`${client.user.tag} has been kicked from #${guild.name}`);
  },
};
