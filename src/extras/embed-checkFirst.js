module.exports = (embed) => {
  const checkFirst = (a, b) =>
    a.length === b.length && a.every((i) => b.includes(i));

  const check = checkFirst(Object.keys(embed.data), [
    "type",
    "title",
    "timestamp",
    "thumbnail",
    "image",
    "footer",
    "fields",
    "description",
    "color",
    "author",
  ]);
  return check;
};
