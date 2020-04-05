const mongoose = require("mongoose");
const { Schema } = mongoose;

const Watch = new Schema({
  insertedAt: {
    default: Date.now,
    type: Schema.Types.Date,
  },
  updatedAt: {
    default: Date.now,
    type: Schema.Types.Date,
  },
  vendor: {
    required: true,
    type: Schema.Types.String,
  },
  watchId: {
    required: true,
    type: Schema.Types.String,
    unique: true,
  },
});

module.exports = mongoose.model("Watch", Watch, "Watches");
