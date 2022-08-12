const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");
const fs = require("node:fs");
const file = fs.readFileSync("./src/json/config.json", "utf-8");
const config = JSON.parse(file);
const write = () => {
  fs.writeFile("./src/json/config.json", JSON.stringify(config), (err) => {
    if (err) throw err;
  });
};

const commands = ["test"];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("prefix")
    .setDescription("Shows prefix commands or Set the prefix of the bot.")
    .addStringOption((option) =>
      option.setName("prefix").setDescription("Set new prefix for 3wE.")
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
  async execute(interaction) {
    const id = interaction.guildId;
    if (!config.guildId[id].hasOwnProperty("prefix")) {
      config.guildId[id].prefix = {
        set: ">",
        activation: true,
      };
      write();
    }

    const newPrefix = interaction.options.getString("prefix");
    const changeActivate = interaction.options.getString("activate");

    if (newPrefix !== null || changeActivate !== null) {
      if (
        !interaction.memberPermissions.has(
          PermissionsBitField.Flags.ManageGuild
        )
      ) {
        return await interaction.reply({
          content: "You don't have permission to do that!",
          ephemeral: true,
        });
      }
    }

    let prefix = config.guildId[id].prefix;
    if (newPrefix !== null) {
      if (prefix.set === newPrefix) {
        return await interaction.reply({
          content: `Prefix is already **\`${newPrefix}\`**!`,
          ephemeral: true,
        });
      }
      prefix.set = newPrefix;
      write();
      return await interaction.reply(
        `Prefix has been change to **\`${newPrefix}\`**`
      );
    } else if (changeActivate !== null) {
      switch (changeActivate) {
        case "on":
          if (prefix.activation === true) {
            return interaction.reply({
              content: "Prefix is already **`on`**!",
              ephemeral: true,
            });
          }

          prefix.activation = true;
          write();
          return interaction.reply("Prefix has been set to **`on`**");

        case "off":
          if (prefix.activation === false) {
            return interaction.reply({
              content: "Prefix is already **`off`**!",
              ephemeral: true,
            });
          }

          prefix.activation = false;
          write();
          return interaction.reply("Prefix has been set to **`off`**");
      }
    } else {
      if (prefix.activation === false)
        return await interaction.reply({
          content:
            "Server prefix is **off**. **`/prefix activate`** to change.",
          ephemeral: true,
        });
      return await interaction.reply({
        content: `Current server prefix: **\`${
          prefix.set
        }\`**, commands: ${commands.map((x) => `**\`${x}\`**`).join(", ")}.`,
        ephemeral: false,
      });
    }
  },
};
