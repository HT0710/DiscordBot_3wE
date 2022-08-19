const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");
const fs = require("fs");
const write = (config) => {
  fs.writeFile("./src/json/config.json", JSON.stringify(config), (err) => {
    if (err) throw err;
  });
};
const content = (str, private = true) => ({
  content: str,
  ephemeral: private,
});

const commands = ["test"];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("prefix")
    .setDescription("Shows prefix commands or Set the prefix of the bot.")
    .addStringOption((option) =>
      option.setName("change").setDescription("Set new prefix for 3wE.")
    )
    .addStringOption((option) =>
      option
        .setName("activate")
        .setDescription("Turn on or off prefix commands.")
        .setChoices(
          {
            name: "on",
            value: "on",
          },
          {
            name: "off",
            value: "off",
          }
        )
    ),
  async execute(interaction, client) {
    // Read file
    const file = fs.readFileSync("./src/json/config.json", "utf-8");
    const config = JSON.parse(file);

    // Get options
    const newPrefix = interaction.options.getString("change");
    const changeActivate = interaction.options.getString("activate");

    // Check permissions
    if (newPrefix !== null || changeActivate !== null) {
      if (
        !interaction.memberPermissions.has(
          PermissionsBitField.Flags.ManageGuild
        )
      ) {
        return await interaction.reply(
          content("You don't have permission to do that!")
        );
      }
    }

    // Execute
    let prefix = config.guildId[interaction.guildId].prefix;
    // If set prefix
    if (newPrefix !== null) {
      if (prefix.set === newPrefix) {
        return await interaction.reply(
          content(`Prefix is already **\`${newPrefix}\`**!`)
        );
      }
      prefix.set = newPrefix;
      write(config);
      return await interaction.reply(
        `Prefix has been change to **\`${newPrefix}\`**`
      );
    }

    // If change activate
    if (changeActivate !== null) {
      switch (changeActivate) {
        case "on":
          if (prefix.activation === true) {
            return await interaction.reply(
              content("Prefix is already **`on`**!")
            );
          }

          prefix.activation = true;
          write(config);
          return await interaction.reply("Prefix has been set to **`on`**");

        case "off":
          if (prefix.activation === false) {
            return await interaction.reply(
              content("Prefix is already **`off`**!")
            );
          }

          prefix.activation = false;
          write(config);
          return await interaction.reply("Prefix has been set to **`off`**");
      }
    }

    // If deactivate
    if (prefix.activation === false) {
      return await interaction.reply(content("Server prefix is **`off`**."));
    }

    // If none of those
    return await interaction.reply(
      `Current server prefix: **\`${prefix.set}\`**, commands: ${commands
        .map((x) => `**\`${x}\`**`)
        .join(", ")}.`
    );
  },
};
