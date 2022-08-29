const { EmbedBuilder, Colors } = require("discord.js");

module.exports = async (interaction, client, name) => {
  const commands = {
    avatar: new EmbedBuilder()
      .setColor(Colors.Gold)
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

    ping: new EmbedBuilder()
      .setColor(Colors.Gold)
      .setTitle("**/ping**")
      .setDescription("Return the ping and the latency."),

    // ai: new EmbedBuilder()
    //   .setColor(Colors.Gold)
    //   .setTitle("**/ai [+]**")
    //   .setDescription("Choose algorithms to process your data.\nOptions:")
    //   .addFields({
    //     name: "**svd [image] [value]**",
    //     value:
    //       "Singular Value Decomposition is used to automatically perform dimensionality reduction. Options:\n|- **image**: The image to process.\n|- **value**: The value to process the image. Smaller mean more reduced.",
    //   }),

    prefix: new EmbedBuilder()
      .setColor(Colors.Gold)
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

    clean: new EmbedBuilder()
      .setColor(Colors.Gold)
      .setTitle("**/clean [!amount]**")
      .setDescription("Delete channel messages.\nOptions(!Required):")
      .addFields({
        name: "**amount**",
        value: "The amount of message to delete.",
      }),

    invite: new EmbedBuilder()
      .setColor(Colors.Gold)
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

    new: new EmbedBuilder()
      .setColor(Colors.Gold)
      .setTitle("**/new**")
      .setDescription("Show recent 3wE update."),

    feedback: new EmbedBuilder()
      .setColor(Colors.Gold)
      .setTitle("**/feedback**")
      .setDescription(
        "Send 3wE a feedback, require a feature or report an error."
      ),

    poll: new EmbedBuilder()
      .setColor(Colors.Gold)
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

    info: new EmbedBuilder()
      .setColor(Colors.Gold)
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

    membercount: new EmbedBuilder()
      .setColor(Colors.Gold)
      .setTitle("**/membercount**")
      .setDescription("Return the total number of current members."),

    history: new EmbedBuilder()
      .setColor(Colors.Gold)
      .setTitle("**/history**")
      .setDescription("Set a channel to store deleted messages."),

    timer: new EmbedBuilder()
      .setColor(Colors.Gold)
      .setTitle("**/timer**")
      .setDescription("Set timer."),

    save: new EmbedBuilder()
      .setColor(Colors.Gold)
      .setTitle("**/save**")
      .setDescription("Save by sending this message to you."),

    send: new EmbedBuilder()
      .setColor(Colors.Gold)
      .setTitle("**/send**")
      .setDescription("Send a message to another channel."),
  };

  return await interaction.reply({ embeds: [commands[name]], ephemeral: true });
};
