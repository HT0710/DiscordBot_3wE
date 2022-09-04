const chalk = require("chalk");
const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ModalBuilder,
  EmbedBuilder,
  TextInputBuilder,
  TextInputStyle,
  Colors,
} = require("discord.js");
const { default: mongoose } = require("mongoose");
const Poll = require("../../schemas/poll");
const timeFormat = (string) => {
  let str = string.trim();
  str = str.toLowerCase();
  if (["forever", "no", "0", "infinity", "eternity"].includes(str)) return null;

  const component = str.split(" ");
  if (component.length > 2) return "error";

  const time = parseFloat(component[0]);
  if (isNaN(time)) return "error";

  const unit = component[1];

  if (["s", "sec", "second", "seconds"].includes(unit)) return time;
  else time * 60;

  if (["m", "min", "minute", "minutes"].includes(unit)) return time;
  else time * 60;

  if (["h", "hour", "hours"].includes(unit)) return time;
  else time * 24;

  if (["d", "day", "days"].includes(unit)) return time;
  else time * 7;

  if (["w", "week", "weeks"].includes(unit)) return time;
  else time * 4.348;

  if (["month", "months"].includes(unit)) return time;
  else return "error";
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("poll")
    .setDescription("Create a poll.")
    .addStringOption((option) =>
      option
        .setName("title")
        .setDescription("Put a title for your poll")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("timer")
        .setDescription(
          "Timer for your poll. Format: [number][blank][units-of-time]. Ex: 5 s, 12 min, 2 days or forever"
        )
        .setAutocomplete(true)
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("description").setDescription("Description for your poll")
    ),
  async autocomplete(interaction, client) {
    const focusedValue = interaction.options.getFocused();
    const choices = [
      "10 seconds",
      "30 seconds",
      "1 minute",
      "15 minutes",
      "1 hour",
      "12 hours",
      "1 day",
      "1 week",
      "forever",
    ];
    const filtered = choices.filter((choice) =>
      choice.startsWith(focusedValue)
    );
    await interaction.respond(
      filtered.map((choice) => ({ name: choice, value: choice }))
    );
  },
  async execute(interaction, client) {
    const title = interaction.options.getString("title");
    const description = interaction.options.getString("description");
    const rawTimer = interaction.options.getString("timer");
    let timer = timeFormat(rawTimer);

    if (timer === "error") {
      const errorEmbed = new EmbedBuilder()
        .setColor(Colors.Red)
        .setTitle("`Wrong timer format`")
        .setDescription("> /help faq [poll timer format]");

      return await interaction.editReply({
        embeds: [errorEmbed],
        ephemeral: true,
      });
    }

    const poll = new Poll({
      _id: mongoose.Types.ObjectId(),
      guildId: interaction.guild.id,
      ownerId: interaction.member.id,
      title: title,
      description: description,
      timer: timer,
    });

    await poll
      .save()
      .catch((e) =>
        console.error(
          chalk.red("[Poll Save Error]:"),
          chalk.yellow(e.name + ":"),
          e.message
        )
      );

    const modal = new ModalBuilder()
      .setCustomId("poll-submit")
      .setTitle("Options for your poll");

    ["🇦", "🇧", "🇨", "🇩", "🇪"].forEach((icon) =>
      modal.addComponents(
        new ActionRowBuilder().addComponents(
          new TextInputBuilder()
            .setCustomId(icon)
            .setLabel(icon)
            .setStyle(TextInputStyle.Short)
            .setRequired(["🇦", "🇧"].includes(icon) ? true : false)
        )
      )
    );

    await interaction.showModal(modal);
  },
};
