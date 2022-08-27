const {
  ContextMenuCommandBuilder,
  ApplicationCommandType,
} = require("discord.js");

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName("Save this")
    .setType(ApplicationCommandType.Message),
  async execute(interaction, client) {
    let message = await interaction.targetMessage.fetch();
    message.nonce = Math.random().toString().slice(2);
    await interaction.member
      .send(message)
      .then(() => interaction.reply({ content: "Saved!", ephemeral: true }))
      .catch((e) =>
        interaction.reply({
          content:
            "This message could not be sent to you! Check your privacy settings.",
          ephemeral: true,
        })
      );
  },
};
