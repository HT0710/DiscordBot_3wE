const chalk = require("chalk");
const { EmbedBuilder, Colors, time } = require("discord.js");
const Poll = require("../../schemas/poll");

module.exports = {
  data: {
    name: "poll-submit",
  },
  async execute(interaction, client) {
    const poll = await Poll.findOne({
      guildId: interaction.guild.id,
      ownerId: interaction.member.id,
    }).sort({ _id: -1 });

    const { title, description, timer } = poll;

    const descList = [];
    let desc = description !== null ? description.toString() : "";
    let string = desc.split(" ");
    const format = (str, i) => {
      do {
        if (string[i + 1] === undefined) return descList.push(string[i]);
        string[i + 1] = string[i] + " " + string[i + 1];
      } while (string[++i].length < 32);
      descList.push(string[i]);
      return format(string[i + 1], i + 1);
    };
    format(desc, 0);

    const pollEmbed = new EmbedBuilder()
      .setColor(Colors.Gold)
      .setTitle(`\`${title}\``)
      .setFooter({
        text: `By ${interaction.member.displayName}`,
        iconURL: interaction.member.displayAvatarURL({ size: 4096 }),
      })
      .setTimestamp();

    const icons = ["🇦", "🇧", "🇨", "🇩", "🇪"];
    const choices = [];
    const reacted = [];
    icons.forEach((icon) => {
      const value = interaction.fields.getTextInputValue(icon);
      if (!value) return;

      reacted.push(icon);
      choices.push({
        icon: icon,
        value: value,
        count: 0,
        percent: { int: 0, str: "" },
      });

      pollEmbed.addFields({
        name: `${icon} : **${value}**`,
        value: "──",
      });
    });

    const expire = timer
      ? time(new Date(new Date().getTime() + timer * 1000), "R")
      : "♾️";

    pollEmbed.setDescription(
      descList.join("\n") +
        "\n" +
        `Expire: **${expire}**` +
        "\n" +
        "━".repeat(20)
    );

    poll.createAt = new Date().getTime();
    poll.endAt = timer ? poll.createAt + timer : timer;

    const message = await interaction.reply({
      embeds: [pollEmbed],
      fetchReply: true,
    });

    choices.forEach(async (choice) => await message.react(choice.icon));

    await poll
      .save()
      .catch((e) =>
        console.error(
          chalk.red("[Poll Save Error]:"),
          chalk.yellow(e.name + ":"),
          e.message
        )
      );

    const filter = (reaction, user) => reacted.includes(reaction.emoji.name);

    const collector = await message.createReactionCollector({
      filter,
      time: timer ? timer * 1000 : null,
    });

    const collectedEmbed = new EmbedBuilder()
      .setColor(Colors.Gold)
      .setTitle(`**Result for \` ${title} \`**`)
      .setFooter({
        text: `Poll by ${interaction.member.displayName} has ended!`,
      });

    collector.on("end", async (collected) => {
      let total = 0;
      choices.forEach((choice, index) => {
        let count = collected.at(index).count - 1;
        choice.count = count;
        total += count;
      });

      collectedEmbed.setDescription(
        `Total: **\`${total}\`** ` +
          (total > 1 ? "reactions!" : "reaction!") +
          `\n${"━".repeat(20)}`
      );

      choices.forEach((choice, index) => {
        let int = Math.round(((collected.at(index).count - 1) / total) * 100);
        choice.percent.int = int ? int : 0;
        const repeat = Math.round(choice.percent.int / 10);
        choice.percent.str = "🟧".repeat(repeat) + "⬛".repeat(10 - repeat);
      });

      choices.sort((b, a) =>
        a.percent.int > b.percent.int
          ? 1
          : a.percent.int === b.percent.int
          ? a.icon < b.icon
            ? 1
            : -1
          : -1
      );

      choices[0].icon += " \u200b \u200b 👑";
      choices.forEach((choice, index) => {
        collectedEmbed.addFields({
          name: `> ${choice.icon}`,
          value:
            `\`${choice.percent.str}\` : **${choice.percent.int}%**` +
            (index === choices.length - 1 ? `\n\n${"━".repeat(20)}` : ""),
        });
      });

      await interaction.followUp({ embeds: [collectedEmbed] });

      await poll
        .delete()
        .catch((e) =>
          console.error(
            chalk.red("[Delete Message Error]:"),
            chalk.yellow(`${e.name}:`),
            e.message
          )
        );
    });
  },
};
