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
    await interaction.deferReply({ ephemeral: true });

    const messageId = interaction.options.getString("message_id");
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

    const channelId = await interaction.options.getString("channel_id");
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
