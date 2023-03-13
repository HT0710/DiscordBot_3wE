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
      .setTitle("**`What you wanna help about❔`**")
      .setDescription("━".repeat(20) + "**` type `**" + "━".repeat(20))
      .addFields(
        {
          name: "🛠️ \u200B \u200B \u200B **Tools**",
          value: "```/help type Tools```",
        },
        {
          name: "🚫 \u200B \u200B \u200B **Moderation**",
          value: "n```/help type Moderation```",
        },
        {
          name: "🎵 \u200B \u200B \u200B **Music**",
          value: "```/help type Music```",
        },
        {
          name: "⚡ \u200B \u200B \u200B **Context Menus**",
          value: "```/help type Context Menus```",
        },
        {
          name: "⭐ \u200B \u200B \u200B **Others**",
          value: "```/help type Others```",
        },
        {
          name: "📜 \u200B \u200B \u200B **All**",
          value: "```/help type All```",
        },
        {
          name: "━".repeat(19) + "**` command `**" + "━".repeat(18),
          value: "> Show help on a specific command.\n```/help command```",
        },
        {
          name: "━".repeat(20) + "**` faq `**" + "━".repeat(21),
          value: "> Show Frequently Asked Questions.\n```/help faq```",
        }
      ),
  ],
  components: [
    new ActionRowBuilder().addComponents(
      new SelectMenuBuilder()
        .setCustomId("helpMenu")
        .setMinValues(1)
        .setMaxValues(1)
        .setPlaceholder("👉 \u200B \u200B Choose type of help")
        .setOptions(
          new SelectMenuOptionBuilder()
            .setLabel("Tools")
            .setEmoji("🛠️")
            .setDescription("Tools that help you manage the server")
            .setValue("tools"),
          new SelectMenuOptionBuilder()
            .setLabel("Moderation")
            .setEmoji("🚫")
            .setDescription(
              "Options that help you to manage members and messages"
            )
            .setValue("moderation"),
          new SelectMenuOptionBuilder()
            .setLabel("Music")
            .setEmoji("🎵")
            .setDescription("Control bot's music player")
            .setValue("music"),
          new SelectMenuOptionBuilder()
            .setLabel("Context Menus")
            .setEmoji("⚡")
            .setDescription("Quick commands performed by right-clicking")
            .setValue("contextMenus"),
          new SelectMenuOptionBuilder()
            .setLabel("Others")
            .setEmoji("⭐")
            .setDescription("Other useful commands")
            .setValue("others"),
          new SelectMenuOptionBuilder()
            .setLabel("All")
            .setEmoji("📜")
            .setDescription("Show all commands")
            .setValue("all")
        )
    ),
  ],
  ephemeral: true,
};
