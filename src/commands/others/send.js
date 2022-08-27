const { SlashCommandBuilder, EmbedBuilder, Colors } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("send")
    .setDescription("Send a message to another channel.")
    .addStringOption((option) =>
      option
        .setName("message_id")
        .setDescription(
          "Id of the message you want to send. /help faq [how to get message id]"
        )
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("channel_id")
        .setDescription(
          "Choose or input the channel id from another server only if bot is in it. /help faq"
        )
        .setAutocomplete(true)
        .setRequired(true)
    ),
  async autocomplete(interaction, client) {
    const focusedValue = interaction.options.getFocused();
    const choices = [];
    await interaction.guild.channels.cache.forEach((channel) => {
      if (channel.type === 0) choices.push(channel);
    });
    const filtered = choices.filter((choice) =>
      choice.name.startsWith(focusedValue)
    );
    await interaction.respond(
      filtered.map((choice) => ({ name: "#" + choice.name, value: choice.id }))
    );
  },
  async execute(interaction, client) {
    const channelId = await interaction.options.getString("channel_id");
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

    const messageId = await interaction.options.getString("message_id");
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
