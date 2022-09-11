const { EmbedBuilder, Colors, AttachmentBuilder } = require("discord.js");
const colors = require("color-name");

module.exports = async (interaction, client, question) => {
  await interaction.deferReply({ ephemeral: true });

  const step_1 = new EmbedBuilder()
    .setColor(Colors.Gold)
    .setTitle(
      "Step 1: Click on `User Settings` (the gear icon next to your Discord avatar)"
    )
    .setImage(
      "https://cdn.discordapp.com/attachments/1008455165210276013/1013190239424094228/unknown.png"
    );

  const step_2 = new EmbedBuilder()
    .setColor(Colors.Gold)
    .setTitle(
      "Step 2: In the left sidebar, click on `Advanced` > Click on the `Developer Mode` toggle to turn it on"
    )
    .setImage(
      "https://cdn.discordapp.com/attachments/904361331795300362/1013193374829903983/unknown.png"
    );

  const reply = async (step_3) => {
    await interaction.editReply({ embeds: [step_1] });
    await interaction.followUp({ embeds: [step_2], ephemeral: true });
    await interaction.followUp({ embeds: [step_3], ephemeral: true });
  };

  switch (question) {
    case "how to get channel id": {
      const channel_3 = new EmbedBuilder()
        .setColor(Colors.Gold)
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
        .setColor(Colors.Gold)
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
        .setColor(Colors.Gold)
        .setTitle(
          "Step 3: To find the Server ID, right-click on the server name in the left sidebar and select `Copy ID`."
        )
        .setImage(
          "https://cdn.discordapp.com/attachments/1013061917629222983/1013198623837802516/unknown.png"
        );
      return reply(guild_3);
    }

    case "how to remove bot": {
      const step123 = new AttachmentBuilder(
        "./src/pictures/help-faq/remove-bot/step123.png"
      );
      const removeBotEmbed = new EmbedBuilder()
        .setColor("Gold")
        .setTitle("`How to remove a bot`")
        .setDescription("Only for below permissions")
        .addFields(
          {
            name: "Administrator",
            value: [
              ">>> **1.** Right-click on the bot name in the text section or the voice section.",
              "**2.** You'll see an option of kicking. Click on it and the bot will be automatically kicked from your server.",
            ].join("\n"),
          },
          {
            name: "Manage Server",
            value: [
              ">>> **1.** Right-click on the Server name.",
              "**2.** Move the mouse to the `Server Settings`.",
              "**3.** Then choose `Integrations`.",
              "**4.** Choose the bot you want to remove.",
              "**5.** Scroll down and click the `Remove-Integration` button.",
            ].join("\n"),
          }
        )
        .setImage("attachment://step123.png");

      return await interaction.editReply({
        embeds: [removeBotEmbed],
        files: [step123],
      });
    }

    case "poll timer format": {
      const timerEmbed = new EmbedBuilder()
        .setColor(Colors.Gold)
        .setTitle("`Timer format`")
        .setDescription(
          "```css\n \u200b \u200b \u200b [number](blank)[units-of-time]\n```"
        )
        .setFields(
          {
            name: "All units of time",
            value:
              ">>> s, sec, second, seconds, m, min, minute, minutes, h, hour, hours, d, day, days, w, week, weeks, month, months",
          },
          {
            name: "Examples",
            value: ">>> 10 s, 20 sec, 2 min, 5 hours, 3 days, 1 week,...",
          }
        );
      return await interaction.editReply({ embeds: [timerEmbed] });
    }

    case "text format": {
      const textFormatEmbed = new EmbedBuilder()
        .setColor(Colors.Gold)
        .setTitle("`Discord text format`");
      const format = {
        "\\> headline": "> headline",
        "\\>>> headline": ">>> auto headline",
        "\\||hidden\\||": "||hidden||",
        "\\*italic\\*": "*italic*",
        "\\*\\*bold\\*\\*": "**bold**",
        "\\*\\*\\*bold italic\\*\\*\\*": "***bold italic***",
        "\\~~strikeout\\~~": "~~strikeout~~",
        "\\__underline\\__": "__underline__",
        "\\`code\\`": "`code`",
      };
      for (const key in format)
        textFormatEmbed.addFields({
          name: key,
          value: format[key],
          inline: true,
        });
      textFormatEmbed.addFields(
        {
          name: "Oder",
          value:
            "> headline > ||hidden|| >  __underline__ > **bold** & *italic* > `code`",
          inline: false,
        },
        {
          name: "Example",
          value:
            "\\> \\||\\__\\*\\*\\*\\`headline hidden underline bold italic code\\`\\*\\*\\*\\__\\||\n> ||__***` headline hidden underline bold italic code`***__||",
          inline: false,
        },
        {
          name: "Note",
          value: "```\\ for ignore the format```",
          inline: false,
        }
      );
      return await interaction.editReply({ embeds: [textFormatEmbed] });
    }

    case "embed colors": {
      const colorList = [];
      for (const color in colors) colorList.push(color);

      const colorsEmbed = new EmbedBuilder()
        .setColor("#2f3136")
        .setTitle("`Embed colors`")
        .setDescription(">>> ```" + colorList.join(" | ") + "```");
      return await interaction.editReply({ embeds: [colorsEmbed] });
    }
  }
};
