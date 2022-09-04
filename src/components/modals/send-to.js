const { EmbedBuilder, Colors } = require("discord.js");

module.exports = {
  data: {
    name: "send-to",
  },
  async execute(interaction, client) {
    await interaction.deferReply({ ephemeral: true });

    const messageId = interaction.fields.getTextInputValue("messageId");
    const message = await interaction.channel.messages
      .fetch(messageId)
      .catch((e) => null);

    const messageNotFoundEmbed = new EmbedBuilder()
      .setColor(Colors.Red)
      .setTitle(
        "```Couldn't find any messages with this id on this channel.```"
      )
      .setDescription("> /help faq [how to get message id]");

    if (!message)
      return interaction.editReply({ embeds: [messageNotFoundEmbed] });

    const channelId = interaction.fields.getTextInputValue("channelId");
    const channel = await client.channels.cache.find(
      (channel) => channel.id === channelId
    );

    const channelNotFoundEmbed = new EmbedBuilder()
      .setColor(Colors.Red)
      .setTitle(
        [
          "`This channel doesn't exist!`",
          "or",
          "`Sent to another server that the bot is not in.`",
        ].join("\n")
      )
      .setDescription("> /help faq [how to get channel id]");

    if (!channel)
      return interaction.editReply({ embeds: [channelNotFoundEmbed] });

    message.nonce = Math.random().toString().slice(2);

    await channel.send(message).catch((e) => {
      message.nonce = Math.random().toString().slice(2);

      channel.send(message).catch((e) => {
        console.error(e.message);

        const errorEmbed = new EmbedBuilder()
          .setColor(Colors.Red)
          .setTitle("```An error occurred while sending this message!```");

        return interaction.editReply({ embeds: [errorEmbed] });
      });
    });

    const doneEmbed = new EmbedBuilder()
      .setColor(Colors.Green)
      .setTitle("```✅ Done!```");

    await interaction.editReply({ embeds: [doneEmbed] });
  },
};
