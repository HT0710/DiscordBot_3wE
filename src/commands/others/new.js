const { SlashCommandBuilder, EmbedBuilder, Colors } = require("discord.js");
const mongoose = require("mongoose");
const Version = require("../../schemas/version");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("new")
    .setDescription("Show recent bot update."),
  async execute(interaction, client) {
    const current = "1.5";

    const version = await Version.findOne({ version: current });
    if (!version) {
      const newVersion = new Version({
        _id: mongoose.Types.ObjectId(),
        version: current,
        content: [
          "Add process event",
          "Improve event handle",
          "Improve save, send, poll, prefix command",
          "Fix and update invite command",
          "Minor changes on avatar, clean command",
          "Complete improvement of all current commands",
        ],
        date: new Date().toLocaleDateString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
      });

      await newVersion.save().catch((e) => console.error(e.message));

      const command = await client.commands.get(interaction.commandName);
      return await command.execute(interaction, client);
    }

    await interaction.deferReply();
    await client.application.fetch();

    const newEmbed = new EmbedBuilder()
      .setColor(Colors.Gold)
      .setTitle(
        `Version **${version.version}@${version.date
          .replace("/2022", "22")
          .replace("/", "")}**`
      )
      .setDescription(">>> ```・" + version.content.join("\n・") + "```")
      .setFooter({
        text: `By ${client.application.owner.tag} | Date ${version.date}`,
        iconURL: client.application.owner.displayAvatarURL({
          dynamic: true,
          extension: "png",
          size: 4096,
        }),
        url: `https://github.com/HT0710`,
      });

    await interaction.editReply({ embeds: [newEmbed] });
  },
};
