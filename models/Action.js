const mongoose = require("mongoose");
const { Schema } = mongoose;

const Action = new Schema({
  vendor: {
    type: Schema.Types.String,
    required: true
  },
  watchId: {
    type: Schema.Types.String,
    required: true
  },
  length: {
    type: Schema.Types.Number,
    required: true
  },
  actionType: {
    type: Schema.Types.String,
    required: true
  },
  payload: {
    type: Schema.Types.ObjectId,
    default: {}
  }
});

module.exports = mongoose.model("Action", Action, "Actions");
