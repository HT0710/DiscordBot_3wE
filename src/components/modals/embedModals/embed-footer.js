const { EmbedBuilder } = require("discord.js");
const isValidURL = require("../../../extras/isValidURL");

module.exports = {
  data: {
    name: "embed-footer",
  },
  async execute(interaction, client) {
    const embed = interaction.message.embeds[0];
    const first = require("../../../extras/embed-checkFirst")(embed);
    const prevEmbed = EmbedBuilder.from(embed);

    const name = interaction.fields.getTextInputValue("text");
    const iconURL = interaction.fields.getTextInputValue("iconURL");

    if (first) {
      if (!name) return await interaction.update({});
      else {
        var newEmbed = new EmbedBuilder().setFooter({
          text: name,
          iconURL: isValidURL(iconURL) ? iconURL : null,
        });
        if (prevEmbed.data.color) newEmbed.setColor(prevEmbed.data.color);
        if (prevEmbed.data.timestamp) newEmbed.setTimestamp();
      }
    } else {
      var newEmbed = prevEmbed;
      if (name === "") delete newEmbed.data.footer;
      else
        newEmbed.setFooter({
          text: name,
          iconURL: isValidURL(iconURL) ? iconURL : null,
        });
    }

    try {
      await interaction.update({ embeds: [newEmbed], files: [] });
    } catch (error) {}
  },
};
