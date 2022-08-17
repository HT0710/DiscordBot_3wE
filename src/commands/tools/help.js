const {
  SlashCommandBuilder,
  SelectMenuBuilder,
  ActionRowBuilder,
  SelectMenuOptionBuilder,
  EmbedBuilder,
  Colors,
} = require("discord.js");

const help_list = ["ai", "avatar", "ping", "prefix", "clean", "invite"].sort();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Shows info about 3wE commands.")
    .addStringOption((option) =>
      option.setName("command").setDescription("Help about...").setChoices(
        {
          name: help_list[0],
          value: help_list[0],
        },
        {
          name: help_list[1],
          value: help_list[1],
        },
        {
          name: help_list[2],
          value: help_list[2],
        },
        {
          name: help_list[3],
          value: help_list[3],
        },
        {
          name: help_list[4],
          value: help_list[4],
        },
        {
          name: help_list[5],
          value: help_list[5],
        }
      )
    ),
  async execute(interaction, client) {
    const value = interaction.options.getString("command");
    const embed = (title, description) =>
      new EmbedBuilder()
        .setColor(Colors.Yellow)
        .setTitle(title)
        .setDescription(description);

    if (value === "avatar") {
      return await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor(Colors.Yellow)
            .setTitle("/avatar [*]")
            .setDescription("*Options:")
            .addFields(
              {
                name: "**member**",
                value: "Get avatar profile of the member target.",
              },
              {
                name: "**server**",
                value: "Get avatar profile of the server.",
              },
              {
                name: "**user**",
                value: "Get avatar profile of the user.",
              }
            ),
        ],
      });
    }

    if (value === "ping") {
      return await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor(Colors.Yellow)
            .setTitle("/ping")
            .setDescription("Return the ping and the latency."),
        ],
      });
    }

    if (value === "ai") {
      return await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor(Colors.Yellow)
            .setTitle("/ai [*]")
            .setDescription(
              "Choose algorithms to process your data.\n*Options:"
            )
            .addFields({
              name: "**svd**",
              value:
                "Singular Value Decomposition is used to automatically perform dimensionality reduction.",
            }),
        ],
      });
    }

    if (value === "prefix") {
      return await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor(Colors.Yellow)
            .setTitle("/prefix [*]")
            .setDescription("Show server current prefix and status.\n*Options:")
            .addFields(
              {
                name: "**change**",
                value: "Set new prefix for 3wE.",
              },
              {
                name: "**activate**",
                value: "Turn on or off prefix commands.",
              }
            ),
        ],
      });
    }

    if (value === "clean") {
      return await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor(Colors.Yellow)
            .setTitle("/clean [amount]")
            .setDescription("Delete channel messages.")
            .addFields({
              name: "**amount**",
              value: "The amount of message to delete.",
            }),
        ],
      });
    }

    if (value === "invite") {
      return await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor(Colors.Yellow)
            .setTitle("/invite [*]")
            .setDescription("Create a invite.\n*Options:")
            .addFields(
              {
                name: "**me**",
                value: "Invite 3wE to your own server.",
              },
              {
                name: "**server**",
                value: "Invite people to this server.",
              }
            ),
        ],
      });
    }

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
