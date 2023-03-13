const {
  EmbedBuilder,
  SelectMenuBuilder,
  SelectMenuOptionBuilder,
} = require("discord.js");

module.exports = {
  data: {
    name: "embed-addFields",
  },
  async execute(interaction, client) {
    const components = interaction.message.components;
    const fieldsRow = components[1];
    const fieldsMenu = SelectMenuBuilder.from(fieldsRow.components[0]);
    const embed = interaction.message.embeds[0];
    const first = require("../../../extras/embed-checkFirst")(embed);
    const prevEmbed = EmbedBuilder.from(embed);

    if (fieldsMenu.options.length >= 25) return;

    const name = interaction.fields.getTextInputValue("name");
    const value = interaction.fields.getTextInputValue("value");
    const inline = interaction.fields.getTextInputValue("inline");
    const newField = {
      name: name,
      value: value,
      inline: ["True", "true"].includes(inline) ? true : false,
    };

    if (first) {
      if (!name || !value) return await interaction.update({});
      else {
        var newEmbed = new EmbedBuilder().addFields(newField);
        if (prevEmbed.data.color) newEmbed.setColor(prevEmbed.data.color);
        if (prevEmbed.data.timestamp) newEmbed.setTimestamp();
      }
    } else {
      var newEmbed = prevEmbed;
      newEmbed.addFields(newField);
    }

    components[1].components[0] = fieldsMenu.addOptions(
      new SelectMenuOptionBuilder()
        .setLabel(`Edit field ${fieldsMenu.options.length}`)
        .setDescription(name)
        .setValue(fieldsMenu.options.length.toString())
    );

    try {
      await interaction.update({
        embeds: [newEmbed],
        components: components,
        files: [],
      });
    } catch (error) {}
  },
};
