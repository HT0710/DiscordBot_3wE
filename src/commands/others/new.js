const { SlashCommandBuilder, EmbedBuilder, Colors } = require("discord.js");
const mongoose = require("mongoose");
const Version = require("../../schemas/version");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("new")
    .setDescription("Show recent bot update.")
    .addStringOption((option) =>
      option
        .setName("version")
        .setDescription("Show updates on specific version")
        .setAutocomplete(true)
    )
    .addBooleanOption((option) =>
      option.setName("public").setDescription("Public this new")
    ),
  async autocomplete(interaction, client) {
    const focusedValue = interaction.options.getFocused();
    const versions = await Version.find({}).sort({ _id: -1 });
    const choices = versions.map((v) => v.version);
    const filtered = choices.filter((choice) =>
      choice.startsWith(focusedValue)
    );
    await interaction.respond(
      filtered.map((choice) => ({ name: choice, value: choice }))
    );
  },
  async execute(interaction, client) {
    const origin = "1.6";
    let current = `${origin}`;

    const selectedVersion = interaction.options.getString("version");
    if (selectedVersion) current = selectedVersion;

    if (
      current === "newUpdate" &&
      interaction.member.id === "779359246227472425"
    ) {
      const newVersion = new Version({
        _id: mongoose.Types.ObjectId(),
        version: origin,
        content: [
          "Add remind command",
          "Add info me command",
          "Add version for new command",
          "Update info command",
          "Update timer command",
          "Improve permission error",
          "Bring back copy to clipboard button",
          "Other minor changes and updates",
        ],
        date: new Date().toLocaleDateString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
      });

      await newVersion.save().catch((e) => console.error(e.message));
      return await interaction.reply({ content: "Done!", ephemeral: true });
    }

    const version = await Version.findOne({ version: current });
    const notFoundEmbed = new EmbedBuilder()
      .setColor(Colors.Red)
      .setTitle("`Version does not exist. Please try again!`");
    if (!version)
      return await interaction.reply({
        embeds: [notFoundEmbed],
        ephemeral: true,
      });

    const public = interaction.options.getBoolean("public");
    if (public) await interaction.deferReply();
    else await interaction.deferReply({ ephemeral: true });
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
