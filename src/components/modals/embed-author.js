module.exports = {
  data: {
    name: "embed-author",
  },
  async execute(interaction, client) {
    const { EmbedBuilder } = require("discord.js");
    const isValidURL = require("../../extras/isValidURL");
    const embed = interaction.message.embeds[0];
    const first = require("../../extras/embed-checkFirst")(embed);
    const prevEmbed = EmbedBuilder.from(embed);

    const name = interaction.fields.getTextInputValue("name");
    const iconURL = interaction.fields.getTextInputValue("iconURL");
    const url = interaction.fields.getTextInputValue("url");

    if (first) {
      if (!name) return await interaction.update({});
      else {
        var newEmbed = new EmbedBuilder().setAuthor({
          name: name,
          iconURL: isValidURL(iconURL) ? iconURL : null,
          url: isValidURL(url) ? url : null,
        });
        if (prevEmbed.data.color) newEmbed.setColor(prevEmbed.data.color);
        if (prevEmbed.data.timestamp) newEmbed.setTimestamp();
      }
    } else {
      var newEmbed = prevEmbed;
      if (name === "") delete newEmbed.data.author;
      else
        newEmbed.setAuthor({
          name: name,
          iconURL: isValidURL(iconURL) ? iconURL : null,
          url: isValidURL(url) ? url : null,
        });
    }

    try {
      await interaction.update({ embeds: [newEmbed], files: [] });
    } catch (error) {}
  },
};
