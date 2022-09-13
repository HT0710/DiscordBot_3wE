module.exports = {
  data: {
    name: "embed-content",
  },
  async execute(interaction, client) {
    const { EmbedBuilder } = require("discord.js");
    const isValidURL = require("../../extras/isValidURL");
    const embed = interaction.message.embeds[0];
    const first = require("../../extras/embed-checkFirst")(embed);
    const prevEmbed = EmbedBuilder.from(embed);

    const title = interaction.fields.getTextInputValue("title");
    const description = interaction.fields.getTextInputValue("description");
    const url = interaction.fields.getTextInputValue("url");

    if (first) {
      if (!title && !description) return await interaction.update({});
      else {
        var newEmbed = new EmbedBuilder();
        if (title) newEmbed.setTitle(title);
        if (description) newEmbed.setDescription(description);
        if (isValidURL(url)) newEmbed.setURL(url);
        if (prevEmbed.data.color) newEmbed.setColor(prevEmbed.data.color);
        if (prevEmbed.data.timestamp) newEmbed.setTimestamp();
      }
    } else {
      var newEmbed = prevEmbed;
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
