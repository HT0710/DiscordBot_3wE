const { EmbedBuilder, ActionRowBuilder } = require("discord.js");

module.exports = {
  data: {
    name: "embed-editFields",
  },
  async execute(interaction, client) {
    const embed = interaction.message.embeds[0];
    const prevEmbed = EmbedBuilder.from(embed);

    const name = interaction.fields.getTextInputValue("name");
    const value = interaction.fields.getTextInputValue("value");
    const inline = interaction.fields.components[2].components[0];

    prevEmbed.data.fields[inline.customId] = {
      name: name,
      value: value,
      inline: ["True", "true"].includes(inline.value) ? true : false,
    };

    const components = interaction.message.components;
    const newFieldMenu = ActionRowBuilder.from(components[1]);
    newFieldMenu.components[0].options[
      parseInt(inline.customId) + 1
    ].data.description = name;
    components[1] = newFieldMenu;

    try {
      await interaction.update({
        embeds: [prevEmbed],
        components: components,
      });
    } catch (error) {}
  },
};
