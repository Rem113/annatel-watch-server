const { model, Schema } = require("mongoose");

const Command = new Schema({
  command: {
    required: true,
    type: Schema.Types.Mixed,
  },
  insertedAt: {
    default: Date.now,
    type: Schema.Types.Date,
  },
  processed: {
    default: false,
    type: Schema.Types.Boolean,
  },
  updatedAt: {
    default: Date.now,
    type: Schema.Types.Date,
  },
  watchId: {
    ref: "Watch",
    required: true,
    type: Schema.Types.ObjectId,
  },
});

module.exports = model("Command", Command, "Commands");
