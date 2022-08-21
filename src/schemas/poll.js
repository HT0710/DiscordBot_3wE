const { Schema, model } = require("mongoose");

const pollSchema = new Schema({
  _id: Schema.Types.ObjectId,
  guildId: {
    type: String,
    require: true,
  },
  ownerId: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  description: String,
  timer: Number,
  createAt: Number,
  endAt: Number,
});

module.exports = model("Poll", pollSchema, "polls");
