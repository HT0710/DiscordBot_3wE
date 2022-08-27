const { EmbedBuilder, Colors } = require("discord.js");

module.exports = async (interaction, client, question) => {
  const step_1 = new EmbedBuilder()
    .setColor(Colors.Yellow)
    .setTitle(
      "Step 1: Click on `User Settings` (the gear icon next to your Discord avatar)"
    )
    .setImage(
      "https://cdn.discordapp.com/attachments/1008455165210276013/1013190239424094228/unknown.png"
    );

  const step_2 = new EmbedBuilder()
    .setColor(Colors.Yellow)
    .setTitle(
      "Step 2: In the left sidebar, click on `Advanced` > Click on the `Developer Mode` toggle to turn it on"
    )
    .setImage(
      "https://cdn.discordapp.com/attachments/904361331795300362/1013193374829903983/unknown.png"
    );

  const reply = async (step_3) => {
    await interaction.reply({
      embeds: [step_1],
      ephemeral: true,
    });
    await interaction.followUp({
      embeds: [step_2],
      ephemeral: true,
    });
    await interaction.followUp({
      embeds: [step_3],
      ephemeral: true,
    });
  };

  switch (question) {
    case "how to get channel id": {
      const channel_3 = new EmbedBuilder()
        .setColor(Colors.Yellow)
        .setTitle(
          "Step 3: To find the Channel ID, right-click on the required channel name in the left sidebar and click on `Copy ID`."
        )
        .setImage(
          "https://cdn.discordapp.com/attachments/904361331795300362/1013193724102201507/unknown.png"
        );

      return reply(channel_3);
    }

    case "how to get message id": {
      const message_3 = new EmbedBuilder()
        .setColor(Colors.Yellow)
        .setTitle(
          "Step 3: To find the Message ID of any message in a channel, simply right-click on the message and select `Copy ID`. You can also click on the three dots next to the message and select `Copy ID`."
        )
        .setImage(
          "https://cdn.discordapp.com/attachments/1013061917629222983/1013198430430044161/unknown.png"
        );

      return reply(message_3);
    }

    case "how to get guild id": {
      const guild_3 = new EmbedBuilder()
        .setColor(Colors.Yellow)
        .setTitle(
          "Step 3: To find the Server ID, right-click on the server name in the left sidebar and select `Copy ID`."
        )
        .setImage(
          "https://cdn.discordapp.com/attachments/1013061917629222983/1013198623837802516/unknown.png"
        );

      return reply(guild_3);
    }

    case "poll timer format": {
      return await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor(Colors.Yellow)
            .setTitle("Timer format")
            .setDescription("``` \u200b [number][blank][units-of-time] ```")
            .setFields(
              {
                name: "**All units of time**",
                value:
                  "s, sec, second, seconds, m, min, minute, minutes, h, hour, hours, d, day, days, w, week, weeks, month, months",
              },
              {
                name: "**Examples:**",
                value: "10 s, 20 sec, 2 min, 5 hours, 3 days, 1 week,...",
              }
            ),
        ],
        ephemeral: true,
      });
    }
  }
};
