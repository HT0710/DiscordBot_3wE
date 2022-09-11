const {
  SlashCommandBuilder,
  EmbedBuilder,
  Colors,
  ButtonBuilder,
  ButtonStyle,
  PermissionFlagsBits,
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("Create an embed")
    .addStringOption((option) =>
      option
        .setName("type")
        .setDescription("Type of the Embed")
        .setChoices(
          { name: "simple", value: "simple" },
          { name: "full", value: "full" }
        )
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.EmbedLinks),
  async execute(interaction, client) {
    let type = interaction.options.getString("type");

    switch (type) {
      case "simple": {
        const simpleModal = new ModalBuilder()
          .setCustomId("embed-simple")
          .setTitle("Custom your Embed")
          .setComponents(
            new ActionRowBuilder().addComponents(
              new TextInputBuilder()
                .setCustomId("title")
                .setLabel("Title")
                .setStyle(TextInputStyle.Short)
                .setRequired(false)
            ),
            new ActionRowBuilder().addComponents(
              new TextInputBuilder()
                .setCustomId("description")
                .setLabel("Description")
                .setPlaceholder("/help faq [text format]")
                .setStyle(TextInputStyle.Paragraph)
                .setRequired(false)
            ),
            new ActionRowBuilder().addComponents(
              new TextInputBuilder()
                .setCustomId("color")
                .setLabel("Color")
                .setPlaceholder("Name or Hex. /help faq [embed colors]")
                .setStyle(TextInputStyle.Short)
                .setRequired(false)
            )
          );
        await interaction.showModal(simpleModal);
        break;
      }

      case "full": {
        await interaction.deferReply({ ephemeral: true });
        const rawEmbed = new EmbedBuilder()
          .setColor(Colors.Gold)
          .setAuthor({
            name: "Author name (URL available)",
            iconURL: client.user.displayAvatarURL(),
          })
          .setThumbnail(
            "https://cdn.discordapp.com/attachments/904361331795300362/1018235399455387729/thumbnail.jpg"
          )
          .setTitle("Title (URL available)")
          .setDescription("Description\n> /help faq [discord text format]")
          .addFields({ name: "Single field", value: "Value" })
          .addFields({ name: "Inline field 1", value: "Value 1", inline: true })
          .addFields({ name: "Inline field 2", value: "Value 2", inline: true })
          .addFields({ name: "Inline field 3", value: "Value 3", inline: true })
          .setImage(
            "https://cdn.discordapp.com/attachments/904361331795300362/1018235127484125407/thumbnail.jpg"
          )
          .setFooter({
            text: "Footer",
            iconURL: client.user.displayAvatarURL(),
          })
          .setTimestamp();

        const contentButton = new ButtonBuilder()
          .setCustomId("embed-content")
          .setLabel("Edit content")
          .setStyle(ButtonStyle.Primary);
        const imagesButton = new ButtonBuilder()
          .setCustomId("embed-images")
          .setLabel("Edit images")
          .setStyle(ButtonStyle.Secondary);
        const authorButton = new ButtonBuilder()
          .setCustomId("embed-author")
          .setLabel("Edit author")
          .setStyle(ButtonStyle.Secondary);
        const footerButton = new ButtonBuilder()
          .setCustomId("embed-footer")
          .setLabel("Edit footer")
          .setStyle(ButtonStyle.Secondary);
        const colorTimestampButton = new ButtonBuilder()
          .setCustomId("embed-colorTimestamp")
          .setLabel("Edit color & timestamp")
          .setStyle(ButtonStyle.Secondary);
        const editRow = new ActionRowBuilder().addComponents(
          contentButton,
          imagesButton,
          authorButton,
          footerButton,
          colorTimestampButton
        );

        const sendButton = new ButtonBuilder()
          .setCustomId("embed-send")
          .setLabel("Send")
          .setStyle(ButtonStyle.Success);
        const cancelButton = new ButtonBuilder()
          .setCustomId("embed-cancel")
          .setLabel("Cancel")
          .setStyle(ButtonStyle.Danger);
        const actionRow = new ActionRowBuilder().addComponents(
          sendButton,
          cancelButton
        );

        await interaction.editReply({
          embeds: [rawEmbed],
          components: [editRow, actionRow],
        });
        break;
      }
    }
  },
};
