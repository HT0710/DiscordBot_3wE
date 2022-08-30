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
        .addIntegerOption((option) =>
          option
            .setName("last_for")
            .setDescription(
              "How long the invite should last (in seconds, 0 for forever)"
            )
        )
    ),
  async execute(interaction, client) {
    const row = (url, label, disabled = false) =>
      new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setURL(url)
          .setLabel(label)
          .setStyle(ButtonStyle.Link)
          .setEmoji("✨")
          .setDisabled(disabled)
      );

    switch (interaction.options.getSubcommand()) {
      case "me": {
        await interaction.deferReply({ ephemeral: true });
        return await interaction.editReply({
          components: [
            row(
              "https://discord.com/api/oauth2/authorize?client_id=1006591332204154951&permissions=8&scope=applications.commands%20bot",
              "Click here!"
            ),
          ],
        });
      }

      case "server": {
        await interaction.deferReply({ ephemeral: true });

        const CIIP = PermissionFlagsBits.CreateInstantInvite;
        if (!interaction.appPermissions.has(CIIP))
          return await interaction.editReply({
            embeds: [
              new EmbedBuilder()
                .setColor(Colors.Red)
                .setTitle(
                  "```Bot don't have permissions to execute this command.```"
                ),
            ],
          });

        const app = await client.application.fetch();
        if (
          !interaction.memberPermissions.has(CIIP) &&
          interaction.member.id !== app.owner.id
        )
          return await interaction.editReply({
            embeds: [
              new EmbedBuilder()
                .setColor(Colors.Red)
                .setTitle(
                  "```User don't have permissions to execute this command.```"
                ),
            ],
          });

        const last = await interaction.options.getInteger("last_for");
        const invite = await interaction.guild.systemChannel.createInvite({
          maxAge: last ? last : null,
        });

        await interaction.editReply({
          embeds: [
            new EmbedBuilder()
              .setColor(Colors.Gold)
              .setTitle(
                `\`\`\`Copy the button to get the invite link to @${interaction.guild.name}.\`\`\``
              )
              .setDescription(
                last
                  ? `Expire: **${time(
                      new Date(new Date().getTime() + last * 1000),
                      "R"
                    )}**`
                  : null
              ),
          ],
          components: [row(invite.url, "Copy this!")],
        });

        if (last) {
          setTimeout(() => {
            interaction.editReply({
              embeds: [
                new EmbedBuilder().setTitle(
                  `\`\`\`@${interaction.guild.name} invite link has Expired!\`\`\``
                ),
              ],
              components: [row(invite.url, "Copy this!", true)],
            });
          }, (last - 1) * 1000);
        }
        break;
      }

      case "channel": {
        const channel = interaction.options.getChannel("name");
        const public = interaction.options.getBoolean("public");
        const message = interaction.options.getString("message");
        const temporary = interaction.options.getBoolean("temporary");
        const last = interaction.options.getInteger("last_for");

        await interaction.deferReply({ ephemeral: true });

        const CIIP = PermissionFlagsBits.CreateInstantInvite;
        if (!interaction.appPermissions.has(CIIP))
          return await interaction.editReply({
            embeds: [
              new EmbedBuilder()
                .setColor(Colors.Red)
                .setTitle(
                  "```Bot don't have permissions to execute this command.```"
                ),
            ],
          });

        const app = await client.application.fetch();
        if (
          !interaction.memberPermissions.has(CIIP) &&
          interaction.member.id !== app.owner.id
        )
          return await interaction.editReply({
            embeds: [
              new EmbedBuilder()
                .setColor(Colors.Red)
                .setTitle(
                  "```User don't have permissions to execute this command.```"
                ),
            ],
          });

        const desc = () =>
          `${
            last
              ? `Expire: **${time(
                  new Date(new Date().getTime() + last * 1000),
                  "R"
                )}**`
              : ""
          }${last && message ? "\n" : ""}${
            message ? `\`\`\`${message}\`\`\`` : ""
          }`;

        const invite = await channel.createInvite({
          temporary: temporary ? temporary : null,
          maxAge: last ? last : null,
          reason: message ? message : null,
        });

        if (public) {
          const msg = await interaction.channel.send({
            embeds: [
              new EmbedBuilder()
                .setColor(Colors.Gold)
                .setTitle(
                  `\`\`\`Click the button to join #${channel.name}.\`\`\``
                )
                .setDescription(desc() ? desc() : null),
            ],
            components: [row(invite.url, "Click here!")],
          });

          await interaction.editReply({ content: "Done!" });

          if (last) {
            setTimeout(() => {
              msg.edit({
                embeds: [
                  new EmbedBuilder().setTitle(
                    `\`\`\`#${channel.name} invite link has Expired!\`\`\``
                  ),
                ],
                components: [row(invite.url, "Click here!", true)],
              });
            }, (last - 1) * 1000);
          }
          return;
        }

        await interaction.editReply({
          embeds: [
            new EmbedBuilder()
              .setColor(Colors.Gold)
              .setTitle(
                `\`\`\`Copy the button to get the invite link to #${channel.name}.\`\`\``
              )
              .setDescription(desc() ? desc() : null),
          ],
          components: [
            row(invite.url, "Copy this!").addComponents(
              new ButtonBuilder()
                .setCustomId(invite.url)
                .setLabel(
                  `Temporary: ${temporary ? "True" : "False"} | Last for: ${
                    last ? last + " second" : "Forever"
                  }`
                )
                .setStyle(ButtonStyle.Secondary)
                .setDisabled(true),
              new ButtonBuilder()
                .setCustomId("invite-public")
                .setLabel("Public this invite")
                .setEmoji("📢")
                .setStyle(ButtonStyle.Success)
            ),
          ],
        });

        let check = false;
        client.on("interactionCreate", async (interaction2) => {
          if (
            !(await interaction2.isButton()) &&
            interaction2.customId !== "invite-public"
          )
            return;

          setTimeout(
            () =>
              interaction.editReply({
                content: "Done!",
                embeds: [],
                components: [],
              }),
            1000
          );
          return (check = true);
        });

        if (last) {
          setTimeout(() => {
            if (!check) {
              interaction.editReply({
                embeds: [
                  new EmbedBuilder().setTitle(
                    `\`\`\`#${channel.name} invite link has Expired!\`\`\``
                  ),
                ],
                components: [row(invite.url, "Copy this!", true)],
              });
            }
          }, (last - 1) * 1000);
        }

        break;
      }
    }
  },
};
