const { EmbedBuilder, Colors } = require("discord.js");

module.exports = async (interaction, client, value) => {
  const embed = new EmbedBuilder().setColor(Colors.Yellow);
  switch (value) {
    case "avatar": {
      return await interaction.reply({
        embeds: [
          embed
            .setTitle("**/avatar [+]**")
            .setDescription("Options:")
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
          embed
            .setTitle("**/ping**")
            .setDescription("Return the ping and the latency."),
        ],
      });
    }

    case "ai": {
      return await interaction.reply({
        embeds: [
          embed
            .setTitle("**/ai [+]**")
            .setDescription("Choose algorithms to process your data.\nOptions:")
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
          embed
            .setTitle("**/prefix [+]**")
            .setDescription("Show server current prefix info.\n+Options:")
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
          embed
            .setTitle("**/clean [!amount]**")
            .setDescription("Delete channel messages.\n!Required")
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
          embed
            .setTitle("**/invite [+]**")
            .setDescription("Create a invite.\nOptions:")
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
          embed.setTitle("**/new**").setDescription("Show recent 3wE update."),
        ],
      });
    }

    case "feedback": {
      return await interaction.reply({
        embeds: [
          embed
            .setTitle("**/feedback**")
            .setDescription(
              "Send 3wE a feedback, require a feature or report an error."
            ),
        ],
      });
    }

    case "poll": {
      return await interaction.reply({
        embeds: [
          embed
            .setTitle("**/poll [!title] [!timer] [description]**")
            .setDescription("Create a poll.\nOption (!Required)")
            .addFields(
              {
                name: "title",
                value: "Put a title for your poll.",
              },
              {
                name: "timer",
                value: "Timer for your poll.",
              },
              {
                name: "description",
                value: "Description for your poll.",
              }
            ),
        ],
      });
    }
  }
};
