const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
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
      option.setName("change").setDescription("Set new prefix for 3wE")
    )
    .addBooleanOption((option) =>
      option.setName("activate").setDescription("Change activation to")
    ),
  async execute(interaction, client) {
    // Get current prefix from database
    const guild = await Guild.findOne({ id: interaction.guild.id });

    // Get options
    const newPrefix = interaction.options.getString("change");
    const changeActivate = interaction.options.getBoolean("activate");

    // Check permissions
    if (newPrefix !== null || changeActivate !== null) {
      if (!interaction.memberPermissions.has(PermissionFlagsBits.ManageGuild)) {
        return await interaction.reply(
          content("You don't have permission to do that!")
        );
      }
    }

    // Execute
    // If change activate
    if (changeActivate !== null) {
      if (guild.prefix.activation === changeActivate) {
        return await interaction.reply(
          content(`Prefix is already **\`${changeActivate ? "On" : "Off"}\`**!`)
        );
      }

      await guild
        .updateOne({ $set: { "prefix.activation": changeActivate } })
        .catch((e) => console.error(e.message));

      return await interaction.reply(
        `Prefix has been set to **\`${changeActivate ? "On" : "Off"}\`**`
      );
    }

    // If deactivate
    if (guild.prefix.activation === false)
      return await interaction.reply(content("Server prefix is **`Off`**"));

    // If set prefix
    if (newPrefix) {
      if (guild.prefix.current === newPrefix) {
        return await interaction.reply(
          content(`Prefix is already **\`${newPrefix}\`**`)
        );
      }

      await guild
        .updateOne({ $set: { "prefix.current": newPrefix } })
        .catch((e) => console.error(e.message));

      return await interaction.reply(
        `Prefix has been change to **\`${newPrefix}\`**`
      );
    }

    // If none of those
    return await interaction.reply(
      `Current server prefix: **\`${
        guild.prefix.current
      }\`**, commands: ${commands.map((x) => `**\`${x}\`**`).join(", ")}.`
    );
  },
};
