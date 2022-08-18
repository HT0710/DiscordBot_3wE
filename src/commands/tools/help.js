const {
  SlashCommandBuilder,
  SelectMenuBuilder,
  ActionRowBuilder,
  SelectMenuOptionBuilder,
  EmbedBuilder,
  Colors,
} = require("discord.js");

const commandList = [];
const commands = require("../../json/help.json");
for (const type in commands)
  commands[type].forEach((command) => commandList.push(command.name));

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Shows info about 3wE commands.")
    .addStringOption((option) => {
      option.setName("command").setDescription("Help about...");
      commandList.sort().forEach((command) =>
        option.addChoices({
          name: command,
          value: command,
        })
      );
      return option;
    }),
  async execute(interaction, client) {
    const value = interaction.options.getString("command");
    const commandList = require("./functions/commandList");

    if (value) return await commandList(interaction, client, value);

    return await interaction.reply({
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
