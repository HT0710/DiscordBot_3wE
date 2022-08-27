const {
  ContextMenuCommandBuilder,
  ApplicationCommandType,
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName("Send to")
    .setType(ApplicationCommandType.Message),
  async execute(interaction, client) {
    await interaction.showModal(
      new ModalBuilder()
        .setCustomId("send-to")
        .setTitle("Channel to send this message")
        .addComponents(
          new ActionRowBuilder().addComponents(
            new TextInputBuilder()
              .setCustomId("channelId")
              .setLabel("Input channel id")
              .setPlaceholder(
                "Note:\nYou can send to another server only if bot is in it\n/help faq [how to get channel id]"
              )
              .setStyle(TextInputStyle.Paragraph)
              .setRequired(true)
          ),
          new ActionRowBuilder().addComponents(
            new TextInputBuilder()
              .setCustomId("messageId")
              .setLabel("You don't need to change message id here!")
              .setPlaceholder("/help faq [how to get message id]")
              .setValue(interaction.targetMessage.id)
              .setStyle(TextInputStyle.Short)
              .setRequired(true)
          )
        )
    );
  },
};
