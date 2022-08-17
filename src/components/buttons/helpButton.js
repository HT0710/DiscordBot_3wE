const {
  SelectMenuBuilder,
  ActionRowBuilder,
  SelectMenuOptionBuilder,
  EmbedBuilder,
  Colors,
} = require("discord.js");

module.exports = {
  data: {
    name: `helpButton`,
  },
  async execute(interaction, client) {
    return await interaction.update({
      embeds: [
        new EmbedBuilder()
          .setColor(Colors.Yellow)
          .setTitle("**What you wanna help about?**")
          .setThumbnail(
            "https://cdn.discordapp.com/attachments/904361331795300362/1009492357516902481/question.gif"
          )
          .addFields(
            {
              name: "**Tools**",
              value: "`/help tools`",
              inline: true,
            },
            {
              name: "**Moderator**",
              value: "`/help moderator`",
              inline: true,
            },
            {
              name: "**Music**",
              value: "`/help music`",
              inline: true,
            },
            {
              name: "**Others**",
              value: "`/help others`",
              inline: true,
            }
          ),
      ],
      components: [
        new ActionRowBuilder().addComponents(
          new SelectMenuBuilder()
            .setCustomId("helpMenu")
            .setMinValues(1)
            .setMaxValues(1)
            .setPlaceholder("👉 Select here!")
            .setOptions(
              new SelectMenuOptionBuilder()
                .setLabel("Tools")
                .setEmoji("🛠️")
                .setDescription("Tools that help you manage the server.")
                .setValue("tools"),
              new SelectMenuOptionBuilder()
                .setLabel("Moderation")
                .setEmoji("🚫")
                .setDescription("Options that help you to manage members.")
                .setValue("moderation"),
              new SelectMenuOptionBuilder()
                .setLabel("Music")
                .setEmoji("🎵")
                .setDescription("Control bot's music player.")
                .setValue("music"),
              new SelectMenuOptionBuilder()
                .setLabel("Others")
                .setEmoji("🔸")
                .setDescription("My other additional commands.")
                .setValue("others")
            )
        ),
      ],
    });
  },
};
