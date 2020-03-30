const mongoose = require("mongoose");
const { Schema } = mongoose;

const Watch = new Schema({
  watchId: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Watch", Watch, "Watches");
