const mongoose = require("mongoose");
const { Schema } = mongoose;

const Watch = new Schema({
  id: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Watch", Watch, "Watches");
