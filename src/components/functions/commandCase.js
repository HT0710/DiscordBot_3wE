const { EmbedBuilder, Colors } = require("discord.js");

module.exports = async (interaction, client, value) => {
  const embed = new EmbedBuilder().setColor(Colors.Yellow);
  switch (value) {
    case "avatar": {
      return await interaction.reply({
        embeds: [
          embed
            .setTitle("**/avatar [+]**")
            .setDescription("Show avatar profile of the target.\nOptions:")
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
              name: "**svd [image] [value]**",
              value:
                "Singular Value Decomposition is used to automatically perform dimensionality reduction. Options:\n|- **image**: The image to process.\n|- **value**: The value to process the image. Smaller mean more reduced.",
            }),
        ],
      });
    }

    case "prefix": {
      return await interaction.reply({
        embeds: [
          embed
            .setTitle("**/prefix [+]**")
            .setDescription("Show server current prefix info.\nOptions:")
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
            .setDescription("Delete channel messages.\nOptions(!Required):")
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
            .setDescription("Create a poll.\nOptions(!Required):")
            .addFields(
              {
                name: "title",
                value: "Put a title for your poll.",
              },
              {
                name: "timer",
                value:
                  "Timer for your poll.\n|- **Format**: `[number][blank][units-of-time]`.\n|- **Units of time**: s, sec, second, m, min,...\n|- **Example**: 5 s, 12 min, 2 days or forever",
              },
              {
                name: "description",
                value: "Description for your poll.",
              }
            ),
        ],
      });
    }

    case "info": {
      return await interaction.reply({
        embeds: [
          embed
            .setTitle("**/info [+]**")
            .setDescription("Return the information of the target.\nOptions:")
            .addFields(
              {
                name: "member",
                value: "Return the information of the member target.",
              },
              {
                name: "server",
                value: "Return the information of the server.",
              }
            ),
        ],
      });
    }

    case "membercount": {
      return await interaction.reply({
        embeds: [
          embed
            .setTitle("**/membercount**")
            .setDescription("Return the total number of current members."),
        ],
      });
    }

    case "history": {
      return await interaction.reply({
        embeds: [
          embed
            .setTitle("**/history**")
            .setDescription("Set a channel to store deleted messages."),
        ],
      });
    }
  }
};
