const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");
const content = (str, private = true) => ({
  content: str,
  ephemeral: private,
});
const Guild = require("../../schemas/guild");

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
    // Get current prefix from database
    const guild = await Guild.findOne({ id: interaction.guild.id });

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
    // If set prefix
    if (newPrefix !== null) {
      if (guild.prefix.current === newPrefix) {
        return await interaction.reply(
          content(`Prefix is already **\`${newPrefix}\`**!`)
        );
      }
      await guild
        .updateOne({ $set: { "prefix.current": newPrefix } })
        .catch((e) => console.error(e.message));
      // await guild.save().catch((e) => console.error(e.message));
      return await interaction.reply(
        `Prefix has been change to **\`${newPrefix}\`**`
      );
    }

    // If change activate
    if (changeActivate !== null) {
      switch (changeActivate) {
        case "on":
          if (guild.prefix.activation === true) {
            return await interaction.reply(
              content("Prefix is already **`on`**!")
            );
          }

          guild.prefix.activation = true;
          await guild.save().catch((e) => console.error(e.message));
          return await interaction.reply("Prefix has been set to **`on`**");

        case "off":
          if (guild.prefix.activation === false) {
            return await interaction.reply(
              content("Prefix is already **`off`**!")
            );
          }

          guild.prefix.activation = false;
          await guild.save().catch((e) => console.error(e.message));
          return await interaction.reply("Prefix has been set to **`off`**");
      }
    }

    // If deactivate
    if (guild.prefix.activation === false) {
      return await interaction.reply(content("Server prefix is **`off`**."));
    }

    // If none of those

    return await interaction.reply(
      `Current server prefix: **\`${
        guild.prefix.current
      }\`**, commands: ${commands.map((x) => `**\`${x}\`**`).join(", ")}.`
    );
  },
};
