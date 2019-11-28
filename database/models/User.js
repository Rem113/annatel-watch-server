const mongoose = require("mongoose");
const { Schema } = mongoose;

const User = new Schema({
  email: {
    type: Schema.Types.String,
    required: true
  },
  password: {
    type: Schema.Types.String,
    required: true
  },
  insertedAt: {
    type: Date,
    default: Date.now
  },
  associatedWatches: [
    {
      type: Schema.Types.ObjectId,
      ref: "Watch"
    }
  ]
});

module.exports = mongoose.model("User", User, "Users");
