const mongoose = require("mongoose");
const { Schema } = mongoose;

const Watch = new Schema({
  watchId: {
    type: Schema.Types.String,
    required: true
  },
  insertedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Watch", Watch, "Watches");
