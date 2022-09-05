const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionFlagsBits,
  Colors,
  ChannelType,
  time,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("invite")
    .setDescription("Create an invite.")
    .addSubcommand((subcommand) =>
      subcommand.setName("me").setDescription("Invite 3wE to your own server.")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("server")
        .setDescription("Invite people to this server.")
        .addBooleanOption((option) =>
          option.setName("public").setDescription("Make the invite public")
        )
        .addIntegerOption((option) =>
          option
            .setName("last_for")
            .setDescription(
              "How long the invite should last (in seconds, 0 for forever)"
            )
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("channel")
        .setDescription("Invite people to the selected channel.")
        .addChannelOption((option) =>
          option
            .setName("name")
            .setDescription("Select a channel to create an invite")
            .addChannelTypes(ChannelType.GuildText)
            .addChannelTypes(ChannelType.GuildVoice)
            .setRequired(true)
        )
        .addBooleanOption((option) =>
          option
            .setName("public")
            .setDescription(
              "Make the invite public so everyone can click it to join"
            )
        )
        .addIntegerOption((option) =>
          option
            .setName("last_for")
            .setDescription(
              "How long the invite should last (in seconds, 0 for forever)"
            )
        )
        .addStringOption((option) =>
          option.setName("message").setDescription("Message for the invite")
        )
        .addBooleanOption((option) =>
          option
            .setName("temporary")
            .setDescription(
              "Members that joined via the invite will be kicked after 24 hours if they haven't yet received a role"
            )
        )
    ),
  async execute(interaction, client) {
    const hasPermission = async () => {
      const app = await client.application.fetch();
      const CIIP = PermissionFlagsBits.CreateInstantInvite;

      if (!interaction.appPermissions.has(CIIP)) {
        const embed = new EmbedBuilder()
          .setColor(Colors.Red)
          .setTitle(
            "```Bot don't have [Create Invite] permission to execute this command.```"
          );

        await interaction.editReply({ embeds: [embed] });
        return false;
      }

      if (
        !interaction.memberPermissions.has(CIIP) &&
        interaction.member.id !== app.owner.id
      ) {
        const embed = new EmbedBuilder()
          .setColor(Colors.Red)
          .setTitle(
            "```User don't have [Create Invite] permission to execute this command.```"
          );

        await interaction.editReply({ embeds: [embed] });
        return false;
      }

      return true;
    };

    switch (interaction.options.getSubcommand()) {
      case "me": {
        await interaction.deferReply({ ephemeral: true });

        const inviteURL =
          "https://discord.com/api/oauth2/authorize?client_id=1006591332204154951&permissions=1239097535991&scope=bot%20applications.commands";

        const embed = new EmbedBuilder()
          .setColor(Colors.Gold)
          .setTitle("```Click the button to invite me!```")
          .setDescription(`>>> or **[Invite Link](${inviteURL})**`);

        const button = new ButtonBuilder()
          .setURL(inviteURL)
          .setLabel("Click here!")
          .setStyle(ButtonStyle.Link)
          .setEmoji("✨");

        return await interaction.editReply({
          embeds: [embed],
          components: [new ActionRowBuilder().addComponents(button)],
        });
      }

      case "server": {
        const public = interaction.options.getBoolean("public");

        if (public) await interaction.deferReply();
        else await interaction.deferReply({ ephemeral: true });

        if (!(await hasPermission())) return;

        let last = await interaction.options.getInteger("last_for");
        last = last ? last : null;

        const timeout = () => {
          setTimeout(() => {
            const expiredEmbed = new EmbedBuilder().setTitle(
              `\`\`\`@${interaction.guild.name} invite link has Expired!\`\`\``
            );

            interaction.editReply({
              embeds: [expiredEmbed],
              components: [],
            });
          }, last * 1000);
        };

        const inviteURL = async () => {
          const invite = await interaction.guild.systemChannel.createInvite({
            maxAge: last ? last + 1 : null,
          });
          return invite.url;
        };

        const expire = [];
        if (last) {
          const timer = time(new Date(new Date().getTime() + last * 1000), "R");
          expire.push(`> Expire: **${timer}**`);
        }

        const getInvite = await inviteURL();
        expire.unshift([`> or **[Invite Link](${getInvite})**`]);

        const clickEmbed = new EmbedBuilder()
          .setColor(Colors.Gold)
          .setTitle(
            `\`\`\`Copy the button to get the invite link to @${interaction.guild.name}.\`\`\``
          )
          .setDescription(expire.join("\n"));

        const clickButton = new ButtonBuilder()
          .setURL(getInvite)
          .setLabel("Copy this!")
          .setEmoji("📋")
          .setStyle(ButtonStyle.Link);

        await interaction.editReply({
          embeds: [clickEmbed],
          components: [new ActionRowBuilder().addComponents(clickButton)],
        });

        if (last) timeout();

        break;
      }

      case "channel": {
        if (!(await hasPermission())) return;

        const channel = interaction.options.getChannel("name");
        const public = interaction.options.getBoolean("public");
        let temporary = interaction.options.getBoolean("temporary");
        let message = interaction.options.getString("message");
        let last = interaction.options.getInteger("last_for");
        temporary = temporary ? temporary : null;
        message = message ? message : null;
        last = last ? last : null;

        const timeout = (check = false) => {
          setTimeout(async () => {
            if (check) {
              const reply = await interaction.fetchReply();
              if (reply.content === "Done!") return;
            }

            const expiredEmbed = new EmbedBuilder().setTitle(
              `\`\`\`#${channel.name} invite link has Expired!\`\`\``
            );

            await interaction.editReply({
              embeds: [expiredEmbed],
              components: [],
            });
          }, last * 1000);
        };

        const inviteURL = async () => {
          const invite = await channel.createInvite({
            temporary: temporary,
            maxAge: last ? last + 2 : null,
            reason: message,
          });
          return invite.url;
        };

        const timer = () =>
          time(new Date(new Date().getTime() + (last + 1) * 1000), "R");

        const desc = [];
        if (message) desc.push(`\`\`\`${message}\`\`\``);
        if (last) desc.unshift(`> Expire: **${timer()}**`);
        if (temporary) desc.unshift("> Temporary: **True**");

        const getInvite = await inviteURL();
        desc.unshift([`> or **[Invite Link](${getInvite})**`]);

        if (public) {
          await interaction.deferReply();

          const joinEmbed = new EmbedBuilder()
            .setColor(Colors.Gold)
            .setTitle(`\`\`\`Click the button to join #${channel.name}.\`\`\``)
            .setDescription(desc.join("\n"));

          const joinButton = new ButtonBuilder()
            .setURL(getInvite)
            .setLabel("Click here!")
            .setStyle(ButtonStyle.Link)
            .setEmoji("✨");

          await interaction.editReply({
            embeds: [joinEmbed],
            components: [new ActionRowBuilder().addComponents(joinButton)],
          });

          if (last) timeout();

          return;
        } else {
          await interaction.deferReply({ ephemeral: true });
          const clickEmbed = new EmbedBuilder()
            .setColor(Colors.Gold)
            .setTitle(
              `\`\`\`Copy the button to get the invite link to #${channel.name}.\`\`\``
            )
            .setDescription(desc.join("\n"));

          const clickButton = new ButtonBuilder()
            .setURL(getInvite)
            .setLabel("Copy this!")
            .setEmoji("📋")
            .setStyle(ButtonStyle.Link);

          const publicButton = new ButtonBuilder()
            .setCustomId("invite-public")
            .setLabel("Public this invite")
            .setEmoji("📢")
            .setStyle(ButtonStyle.Success);

          await interaction.editReply({
            embeds: [clickEmbed],
            components: [
              new ActionRowBuilder().addComponents(clickButton, publicButton),
            ],
          });

          if (last) timeout(true);
        }
        break;
      }
    }
  },
};
