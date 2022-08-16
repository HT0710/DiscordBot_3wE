const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionsBitField,
  Colors,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("invite")
    .setDescription("Invite 3wE to your own server.")
    .addSubcommand((subcommand) =>
      subcommand.setName("me").setDescription("Invite 3wE to your own server.")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("server")
        .setDescription("Invite people to this server.")
    ),
  async execute(interaction, client) {
    const row = (url, label) =>
      new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setURL(url)
          .setLabel(label)
          .setStyle(ButtonStyle.Link)
          .setEmoji("✨")
      );

    switch (interaction.options.getSubcommand()) {
      case "me": {
        return await interaction.reply({
          components: [
            row(
              "https://discord.com/api/oauth2/authorize?client_id=1006591332204154951&permissions=8&scope=applications.commands%20bot",
              "Click here!"
            ),
          ],
          ephemeral: true,
        });
      }

      case "server": {
        const CIIP = PermissionsBitField.Flags.CreateInstantInvite;
        if (!interaction.appPermissions.has(CIIP))
          return await interaction.reply(
            content("Bot don't have permissions to execute this command.")
          );
        if (!interaction.memberPermissions.has(CIIP))
          return await interaction.reply(
            content("User don't have permissions to execute this command.")
          );
        let inviteURL = "";
        await interaction.guild.systemChannel
          .createInvite()
          .then((invite) => (inviteURL = invite.url));

        return await interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setColor(Colors.Yellow)
              .setTitle("Copy the button to get the invite link."),
          ],
          components: [row(inviteURL, "Copy this!")],
          ephemeral: true,
        });
      }
    }
  },
};
