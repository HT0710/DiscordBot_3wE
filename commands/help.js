const { SlashCommandBuilder } = require("discord.js");

const help_list = ["avatar", "ping"].sort();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Shows 3wE info and commands.")
    .addStringOption((option) =>
      option.setName("command").setDescription("Help about...").setChoices(
        {
          name: help_list[0],
          value: help_list[0],
        },
        {
          name: help_list[1],
          value: help_list[1],
        }
      )
    ),
  async execute(interaction) {
    const value = interaction.options.getString("command");
    if (value === "avatar") {
      return interaction.reply(
        "**`/avatar`**: Return *your* __avatar__ or **@mention** __avatar__"
      );
    }

    if (value === "ping") {
      return interaction.reply("**`/ping`**: Return the **Latency**.");
    }

    return interaction.reply(
      `All available **\`/\`** commands: ${help_list
        .map((x) => `**\`${x}\`**`)
        .join(", ")}`
    );
  },
};
