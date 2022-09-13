module.exports = {
  data: {
    name: "embed-colorTimestamp",
  },
  async execute(interaction, client) {
    const { EmbedBuilder } = require("discord.js");
    const convert = require("color-convert");
    const colors = require("color-name");
    const embed = interaction.message.embeds[0];
    const prevEmbed = EmbedBuilder.from(embed);

    const color = interaction.fields.getTextInputValue("color");
    const timestamp = interaction.fields.getTextInputValue("timestamp");

    const newEmbed = prevEmbed;
    if (colors.hasOwnProperty(color)) newEmbed.setColor(colors[color]);
    else {
      try {
        newEmbed.setColor(convert.keyword.hex(color));
      } catch (error) {
        newEmbed.setColor("#2f3136");
      }
    }
    if (["True", "true"].includes(timestamp)) newEmbed.setTimestamp();
    else delete newEmbed.data.timestamp;

    try {
      await interaction.update({ embeds: [newEmbed], files: [] });
    } catch (error) {}
  },
};
