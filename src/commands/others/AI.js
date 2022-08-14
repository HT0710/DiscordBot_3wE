const { SlashCommandBuilder } = require("discord.js");

const algo = ["svd"].sort();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ai")
    .setDescription("Processing data using AI algorithms.")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("svd")
        .setDescription(
          "Singular Value Decomposition is used to automatically perform dimensionality reduction."
        )
        .addAttachmentOption((option) =>
          option
            .setName("image")
            .setDescription("Send a image to process")
            .setRequired(true)
        )
        .addIntegerOption((option) =>
          option
            .setName("value")
            .setDescription("Value to reduce, smaller value = more reduce")
            .setRequired(true)
        )
    ),
  async execute(interaction) {
    if (interaction.options.getSubcommand() === "svd") {
      const SVD = require("./ai/SVD");
      return SVD(interaction);
    }
  },
};
