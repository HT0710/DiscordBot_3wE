const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Get the avatar of the selected.")
    .addUserOption((option) =>
      option.setName("target").setDescription("Show target profile avatar,")
    )
    .addStringOption((option) =>
      option.setName("myself").setDescription("Show myself profile avatar.")
    )
    .addStringOption((option) =>
      option.setName("guild").setDescription("Show guild profile avatar.")
    ),
  async execute(interaction) {
    const target = interaction.options.getUser("target");
    const guild = interaction.options.getUser("guild");
    if (target) {
      return await interaction.reply(
        target.displayAvatarURL({
          dynamic: true,
          extension: "png",
          size: 4096,
        })
      );
    }

    if (guild) {
      return await interaction.reply(
        target.displayAvatarURL({
          dynamic: true,
          extension: "png",
          size: 4096,
        })
      );
    }

    return await interaction.reply(
      interaction.user.displayAvatarURL({
        dynamic: true,
        extension: "png",
        size: 4096,
      })
    );
  },
};
