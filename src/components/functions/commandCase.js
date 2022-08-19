const { EmbedBuilder, Colors } = require("discord.js");

module.exports = async (interaction, client, value) => {
  switch (value) {
    case "avatar": {
      return await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor(Colors.Yellow)
            .setTitle("**/avatar [*]**")
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

    case "ping": {
      return await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor(Colors.Yellow)
            .setTitle("**/ping**")
            .setDescription("Return the ping and the latency."),
        ],
      });
    }

    case "ai": {
      return await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor(Colors.Yellow)
            .setTitle("**/ai [*]**")
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

    case "prefix": {
      return await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor(Colors.Yellow)
            .setTitle("**/prefix [*]**")
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

    case "clean": {
      return await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor(Colors.Yellow)
            .setTitle("**/clean [amount]**")
            .setDescription("Delete channel messages.")
            .addFields({
              name: "**amount**",
              value: "The amount of message to delete.",
            }),
        ],
      });
    }

    case "invite": {
      return await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor(Colors.Yellow)
            .setTitle("**/invite [*]**")
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

    case "new": {
      return await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor(Colors.Yellow)
            .setTitle("**/new**")
            .setDescription("Show recent 3wE update."),
        ],
      });
    }

    case "feedback": {
      return await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor(Colors.Yellow)
            .setTitle("**/feedback**")
            .setDescription(
              "Send 3wE a feedback, require a feature or report an error."
            ),
        ],
      });
    }
  }
};
