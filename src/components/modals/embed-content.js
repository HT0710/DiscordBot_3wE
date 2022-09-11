const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: {
    name: "embed-content",
  },
  async execute(interaction, client) {
    const title = interaction.fields.getTextInputValue("title");
    const description = interaction.fields.getTextInputValue("description");
    const url = interaction.fields.getTextInputValue("url");
    const embed = interaction.message.embeds[0];
    const isValidURL = require("../../extras/isValidURL");
    const first = require("../../extras/embed-checkFirst")(embed);

    if (first && (title || description)) {
      var newEmbed = new EmbedBuilder();
      if (title) newEmbed.setTitle(title);
      if (description) newEmbed.setDescription(description);
      if (isValidURL(url)) newEmbed.setURL(url);
    } else {
      var newEmbed = EmbedBuilder.from(embed);
      if (title === "") delete newEmbed.data.title;
      else newEmbed.setTitle(title);

      if (description === "") delete newEmbed.data.description;
      else newEmbed.setDescription(description);

      if (url === "") delete newEmbed.data.url;
      else if (isValidURL(url)) newEmbed.setURL(url);
    }

    try {
      await interaction.update({ embeds: [newEmbed], files: [] });
    } catch (error) {}
  },
};
