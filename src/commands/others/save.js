const { SlashCommandBuilder, ApplicationCommandType } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("save")
    .setDescription("Save by sending this message to you.")
    .addStringOption((option) =>
      option
        .setName("message_id")
        .setDescription("Id of the message you want to save")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const messageId = await interaction.options.getString("message_id");
    const message = await interaction.channel.messages.fetch(messageId);
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
