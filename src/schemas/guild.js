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
    current: {
      type: String,
      default: ">",
    },
    activation: {
      type: Boolean,
      default: true,
    },
  },
  history: {
    type: String,
    default: null,
  },
});

module.exports = model("Guild", guildSchema, "guilds");
