const mongoose = require("mongoose");
const { Schema } = mongoose;

const Watch = new Schema({
  insertedAt: {
    type: Schema.Types.Date,
    default: Date.now
  },
  updatedAt: {
    type: Schema.Types.Date,
    default: Date.now
  },
  vendor: {
    type: Schema.Types.String,
    required: true
  },
  watchId: {
    type: Schema.Types.String,
    required: true
  }
});

module.exports = mongoose.model("Watch", Watch, "Watches");
