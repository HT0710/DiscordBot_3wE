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
  if (["forever", "no", "0", "infinity", "eternity"].includes(str))
    return "forever";

  const component = str.split(" ");
  if (component.length > 2) return "error";

  const time = parseFloat(component[0]);
  if (isNaN(time)) return "error";

  const format = component[1];

  let value;
  switch (format) {
    case "s":
    case "sec":
    case "second":
    case "seconds":
      value = time;
      break;

    case "m":
    case "min":
    case "minute":
    case "minutes":
      value = time * 60;
      break;

    case "h":
    case "hour":
    case "hours":
      value = time * 3600;
      break;

    case "d":
    case "day":
    case "days":
      value = time * 86400;
      break;

    case "w":
    case "week":
    case "weeks":
      value = time * 604800;
      break;

    case "m":
    case "month":
    case "months":
      value = time * 2629743;
      break;

    default:
      return "error";
  }

  return value.toString();
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
        .setRequired(true)
        .setAutocomplete(true)
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
    switch (timer) {
      case "error":
        return await interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setColor(Colors.Yellow)
              .setTitle("Wrong timer format.")
              .setDescription(
                "**Format**: [number][blank][units-of-time].\n**Units of time**: s, sec, second, m, min,...\n**Example**: 5 s, 12 min, 2 days or forever"
              ),
          ],
          ephemeral: true,
        });

      case "forever":
        timer = null;
        break;

      default:
        timer = parseInt(timer);
    }

    const poll = new Poll({
      _id: mongoose.Types.ObjectId(),
      guildId: interaction.guild.id,
      ownerId: interaction.member.id,
      title: title,
      description: description,
      timer: timer,
    });

    await poll.save().catch((e) => console.log(e.message));

    const modal = new ModalBuilder()
      .setCustomId("poll-submit")
      .setTitle("Options for your poll");

    for (let i = 1; i <= 5; i++) {
      modal.addComponents(
        new ActionRowBuilder().addComponents(
          new TextInputBuilder()
            .setCustomId(i.toString())
            .setLabel("Choice " + i)
            .setRequired(i > 2 ? false : true)
            .setStyle(TextInputStyle.Short)
        )
      );
    }

    await interaction.showModal(modal);
  },
};
