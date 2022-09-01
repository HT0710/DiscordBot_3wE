const { Schema, model } = require("mongoose");

const versionSchema = new Schema({
  _id: Schema.Types.ObjectId,
  version: {
    type: String,
    require: true,
  },
  content: {
    type: Array,
    require: true,
  },
  date: String,
});

module.exports = model("Version", versionSchema, "version");
