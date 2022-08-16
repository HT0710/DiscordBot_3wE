const { SlashCommandBuilder } = require("discord.js");

const help_list = ["ai", "avatar", "ping", "prefix", "clean", "invite"].sort();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Shows info about 3wE commands.")
    .addStringOption((option) =>
      option.setName("command").setDescription("Help about...").setChoices(
        {
          name: help_list[0],
          value: help_list[0],
        },
        {
          name: help_list[1],
          value: help_list[1],
        },
        {
          name: help_list[2],
          value: help_list[2],
        },
        {
          name: help_list[3],
          value: help_list[3],
        },
        {
          name: help_list[4],
          value: help_list[4],
        },
        {
          name: help_list[5],
          value: help_list[5],
        }
      )
    ),
  async execute(interaction) {
    const value = interaction.options.getString("command");

    if (value === "avatar") {
      return await interaction.reply(
        "**`/avatar`**: Return avatar of the member or the guild or yourself."
      );
    }

    if (value === "ping") {
      return await interaction.reply("**`/ping`**: Return the ping.");
    }

    if (value === "ai") {
      return await interaction.reply(
        "**`/ai`**: Choose algorithms to process your data."
      );
    }

    if (value === "prefix") {
      return await interaction.reply(
        "**`/prefix`**: Shows server current prefix and prefix commands."
      );
    }

    if (value === "clean") {
      return await interaction.reply("**`/clean`**: Delete channel messages.");
    }

    if (value === "invite") {
      return await interaction.reply(
        "**`/invite`**: Invite me to your server or Create a server invite."
      );
    }

    return await interaction.reply(
      `All available **\`/\`** commands: ${help_list
        .map((x) => `**\`${x}\`**`)
        .join(", ")}.`
    );
  },
};
