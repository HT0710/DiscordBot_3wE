const { Schema, model } = require("mongoose");

const guildSchema = new Schema({
  _id: Schema.Types.ObjectId,
  id: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  iconURL: String,
  ownerId: String,
  prefix: {
    current: String,
    activation: Boolean,
  },
});

module.exports = model("Guild", guildSchema, "guilds");
