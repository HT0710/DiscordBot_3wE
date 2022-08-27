const { EmbedBuilder, Colors } = require("discord.js");

module.exports = {
  data: {
    name: "send-to",
  },
  async execute(interaction, client) {
    const channelId = interaction.fields.getTextInputValue("channelId");
    const channel = await client.channels.cache.find(
      (channel) => channel.id === channelId
    );
    if (!channel)
      return await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor(Colors.Red)
            .setTitle(
              "```- This channel doesn't exist!```\n```- Sent to another server that the bot is not in.```"
            ),
        ],
        ephemeral: true,
      });

    const messageId = interaction.fields.getTextInputValue("messageId");
    const message = await interaction.channel.messages
      .fetch(messageId)
      .catch((e) => {});
    if (!message)
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor(Colors.Red)
            .setTitle(
              "```Couldn't find any messages with this id on this channel.```"
            ),
        ],
        ephemeral: true,
      });
    message.nonce = Math.random().toString().slice(2);

    try {
      await channel.send(message);

      await interaction.reply({
        embeds: [
          new EmbedBuilder().setColor(Colors.Green).setTitle("```✅ Done!```"),
        ],
        ephemeral: true,
      });
    } catch (e) {
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor(Colors.Red)
            .setTitle("```An error occurred while sending this message!```"),
        ],
        ephemeral: true,
      });
    }
  },
};
