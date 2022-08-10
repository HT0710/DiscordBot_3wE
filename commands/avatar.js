const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription(
      "Get the avatar URL of the selected user, or your own avatar."
    )
    .addUserOption((option) =>
      option.setName("target").setDescription("The user's avatar to show")
    ),
  async execute(interaction) {
    const user = interaction.options.getUser("target");
    if (user)
      return interaction.reply(
        `${user.displayAvatarURL({
          dynamic: true,
        })}?size=4096`
      );
    return interaction.reply(
      `${interaction.user.displayAvatarURL({
        dynamic: true,
      })}?size=4096`
    );
  },
};
