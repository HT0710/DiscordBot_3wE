const {
  ActionRowBuilder,
  SelectMenuBuilder,
  SelectMenuOptionBuilder,
  EmbedBuilder,
  Colors,
} = require("discord.js");

module.exports = {
  embeds: [
    new EmbedBuilder()
      .setColor(Colors.Gold)
      .setTitle("**What you wanna help about?**")
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/904361331795300362/1009492357516902481/question.gif"
      )
      .addFields(
        {
          name: "🛠️ \u200B \u200B **Tools**",
          value: "`/help type tools`",
        },
        {
          name: "🚫 \u200B \u200B **Moderator**",
          value: "`/help type moderator`",
        },
        {
          name: "🎵 \u200B \u200B **Music**",
          value: "`/help type music`",
        },
        {
          name: "🔸 \u200B \u200B **Others**",
          value: "`/help type others`",
        },
        {
          name: "🔹 \u200B \u200B **All**",
          value: "`/help type all`",
        }
      ),
  ],
  components: [
    new ActionRowBuilder().addComponents(
      new SelectMenuBuilder()
        .setCustomId("helpMenu")
        .setMinValues(1)
        .setMaxValues(1)
        .setPlaceholder("👉 \u200B \u200B Select here!")
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
            .setValue("others"),
          new SelectMenuOptionBuilder()
            .setLabel("All")
            .setEmoji("🔹")
            .setDescription("All of my commands.")
            .setValue("all")
        )
    ),
  ],
};
