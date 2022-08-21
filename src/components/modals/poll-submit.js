const { EmbedBuilder, Colors } = require("discord.js");
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

    const { title, description } = poll;
    const timer = parseInt(poll.timer) ? poll.timer : null;

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
    const embed = new EmbedBuilder()
      .setColor(Colors.Yellow)
      .setTitle(`**${title}**`)
      .setDescription(descList.join("\n") + "\n" + "- \u200B \u200B".repeat(18))
      .setFooter({
        text: `By ${interaction.member.displayName}`,
        iconURL: interaction.member.displayAvatarURL({ size: 4096 }),
      })
      .setTimestamp();

    const icons = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣"];
    const reacts = [];
    const choices = [];
    icons.forEach((icon, index) => {
      const value = interaction.fields.getTextInputValue(
        (index + 1).toString()
      );
      if (value) {
        choices.push({ name: value, count: 0, percent: { int: 0, str: "" } });
        reacts.push(icon);
        embed.addFields({
          name: `${icon} \u200B \u200B ${value}`,
          value: "\u200B",
        });
      }
    });

    const message = await interaction.reply({
      embeds: [embed],
      fetchReply: true,
    });
    reacts.forEach(async (icon) => await message.react(icon));

    poll.createAt = new Date().getTime();
    poll.endAt = timer ? poll.createAt + timer : timer;
    await poll.save().catch((e) => console.error(e.message));

    const filter = (reaction, user) => {
      return reacts.includes(reaction.emoji.name);
    };

    const collector = message.createReactionCollector({
      filter,
      time: timer ? timer * 1000 : null,
    });

    const collectedEmbed = new EmbedBuilder()
      .setColor(Colors.Yellow)
      .setTitle(`**Result:** \` ${title} \``);

    collector.on("end", async (collected) => {
      let total = 0;
      choices.forEach((choice, index) => {
        let count = collected.at(index).count - 1;
        choice.count = count;
        total += count;
      });
      collectedEmbed.setDescription(`Total: **${total}** reaction`);

      choices.forEach((choice, index) => {
        choice.percent.int = Math.round(
          ((collected.at(index).count - 1) / total) * 100
        );
        const repeat = Math.round(choice.percent.int / 10);
        choice.percent.str = "🟨".repeat(repeat) + "⬛".repeat(10 - repeat);
      });

      choices.sort((b, a) =>
        a.percent.int > b.percent.int
          ? 1
          : a.percent.int === b.percent.int
          ? a.name < b.name
            ? 1
            : -1
          : -1
      );

      choices.forEach((choice) => {
        collectedEmbed.addFields({
          name: `**${choice.name}**`,
          value: `${choice.percent.str} **${choice.percent.int}%**`,
        });
      });

      await interaction.followUp({ embeds: [collectedEmbed] });
      await poll.delete().catch((e) => console.error(e.message));
    });
  },
};
