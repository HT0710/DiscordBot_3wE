module.exports = (embed) =>
  ["Title (URL available)", "Description\n> /help faq [text format]"].every(
    (value) => Object.values(embed.data).includes(value)
  );
