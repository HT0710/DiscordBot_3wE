const { EmbedBuilder, Colors } = require("discord.js");

module.exports = async (interaction, client, name) => {
  const commands = {
    avatar: new EmbedBuilder()
      .setColor(Colors.Gold)
      .setTitle("**`/avatar {subcommand}`**")
      .setDescription(
        "・Get the avatar of the selected.\n\
        > Subcommands: **member, server, user**"
      )
      .addFields(
        {
          name: "**`/avatar member [target]`**",
          value:
            "・Show member profile avatar.\n・**[target]**: Member to get avatar.",
        },
        {
          name: "**`/avatar server`**",
          value: "・Show server profile avatar.",
        },
        {
          name: "**`/avatar user`**",
          value: "・Show yourself profile avatar.",
        }
      ),

    ping: new EmbedBuilder()
      .setColor(Colors.Gold)
      .setTitle("**`/ping`**")
      .setDescription("・Return the ping and the latency."),

    prefix: new EmbedBuilder()
      .setColor(Colors.Gold)
      .setTitle("**`/prefix`**")
      .setDescription(
        [
          "・Show server current prefix info.",
          ">>> Options: **change, activate**",
          "・**change**: Set a new prefix for the bot in the server.",
          "・**activate**: Turn on or off prefix commands.",
        ].join("\n")
      ),

    clean: new EmbedBuilder()
      .setColor(Colors.Gold)
      .setTitle("**`/clean [amount]`**")
      .setDescription(
        [
          "・Delete channel messages.",
          "・**[amount]**: The amount of message to delete.",
        ].join("\n")
      ),

    invite: new EmbedBuilder()
      .setColor(Colors.Gold)
      .setTitle("`/invite {subcommand}`")
      .setDescription(
        ["・Create an invite.", "> Subcommands: **me, server, channel**"].join(
          "\n"
        )
      )
      .addFields(
        {
          name: "**`/invite me`**",
          value: "・Invite bot to your own server.",
        },
        {
          name: "**`/invite server`**",
          value: [
            "・Invite people to this server.",
            ">>> Options: **public, last_for**",
            "・**public**: Make the invite public.",
            "・**last_for**: How long the invite should last (in seconds, 0 for forever).",
          ].join("\n"),
        },
        {
          name: "**`/invite channel [name]`**",
          value: [
            "・Invite people to the selected channel.",
            "・**[name]**: Name of the channel to create an invite.",
            ">>> Options: **public, message, temporary, last_for**",
            "・**public**: Make the invite public so everyone can click it to join.",
            "・**last_for**: How long the invite should last (in seconds, 0 for forever).",
            "・**message**: Message for the invite.",
            "・**temporary**: Members that joined via the invite will be kicked after 24 hours if they haven't yet received a role.",
          ].join("\n"),
        }
      ),

    new: new EmbedBuilder()
      .setColor(Colors.Gold)
      .setTitle("**`/new`**")
      .setDescription(
        [
          "・Show recent bot update.",
          ">>> Options: **version, public**",
          "・**version**: Show updates on specific version.",
          "・**public**: Public this info.",
        ].join("\n")
      ),

    feedback: new EmbedBuilder()
      .setColor(Colors.Gold)
      .setTitle("**`/feedback`**")
      .setDescription(
        "・Send a feedback, require a feature or report an error."
      ),

    poll: new EmbedBuilder()
      .setColor(Colors.Gold)
      .setTitle("**`/poll [title] [timer]`**")
      .setDescription(
        [
          "・Create a poll.",
          ">>> Options: **description**",
          "・**description**: Description for your poll.",
        ].join("\n")
      )
      .addFields(
        {
          name: "**`[title]`**",
          value: "・Put a title for your poll.",
        },
        {
          name: "**`[timer]`**",
          value: [
            "・Timer for your poll.",
            ">>> **Format: `[number] [units-of-time]`**",
            "・**[number]**: Time number.",
            "・**[units-of-time]**: s, sec, second, m, min,...",
            "・**Example**: 5 s, 12 min, 2 days or forever.",
          ].join("\n"),
        }
      ),

    info: new EmbedBuilder()
      .setColor(Colors.Gold)
      .setTitle("**`/info {subcommand}`**")
      .setDescription(
        [
          "・Return the information of the target.",
          "> Subcommands: **member, server, me**",
        ].join("\n")
      )
      .addFields(
        {
          name: "**`/info member [target]`**",
          value: [
            "・Return the information of the member target.",
            "・**[target]**: Member to get info.",
            ">>> Options: **public**",
            "・**public**: Public this info.",
          ].join("\n"),
        },
        {
          name: "**`/info server`**",
          value: [
            "・Return the information of the server.",
            ">>> Options: **public**",
            "・**public**: Public this info.",
          ].join("\n"),
        },
        {
          name: "**`/info me`**",
          value: [
            "・Return the information of the bot.",
            ">>> Options: **public**",
            "・**public**: Public this info.",
          ].join("\n"),
        }
      ),

    membercount: new EmbedBuilder()
      .setColor(Colors.Gold)
      .setTitle("**`/membercount [bot]`**")
      .setDescription(
        [
          "・Return the total number of current members.",
          "・**[bot]**: Including bots (Default: True).",
        ].join("\n")
      ),

    history: new EmbedBuilder()
      .setColor(Colors.Gold)
      .setTitle("**`/history [channel]`**")
      .setDescription(
        [
          "・Set a channel to store deleted messages.",
          "・**[Channel]**: The channel to set as history storage.",
          ">>> You cannot recover deleted messages on Discord. So this command saves those messages in a selected private channel called the history storage channel.",
        ].join("\n")
      ),

    timer: new EmbedBuilder()
      .setColor(Colors.Gold)
      .setTitle("**`/timer [minute]`**")
      .setDescription(
        [
          "・Set timer.",
          "・**[minute]**: Set minutes for your timer.",
          ">>> Options: **hour, second, description**",
          "・**hour**: Set hours for your timer.",
          "・**second**: Set seconds for your timer.",
          "・**description**: Set timer description.",
        ].join("\n")
      ),

    save: new EmbedBuilder()
      .setColor(Colors.Gold)
      .setTitle("**`/save`**")
      .setDescription("・Save by sending the message to you."),

    send: new EmbedBuilder()
      .setColor(Colors.Gold)
      .setTitle("**`/send`**")
      .setDescription("・Send a message to another channel."),

    reminder: new EmbedBuilder()
      .setColor(Colors.Gold)
      .setTitle("**`/reminder [content] [minute]`**")
      .setDescription(
        [
          "・Remind you after time.",
          "・**[content]**: Set reminder content.",
          "・**[minute]**: Set minute for reminder.",
          ">>> Options: **hour, second**",
          "・**hour**: Set hours for reminder.",
          "・**second**: Set seconds for reminder.",
        ].join("\n")
      ),
  };

  return await interaction.reply({ embeds: [commands[name]], ephemeral: true });
};
