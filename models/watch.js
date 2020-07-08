const mongoose = require("mongoose")
const { Schema } = mongoose

const MessageSchema = new Schema({
  _id: {
    required: true,
    type: String,
  },
  posted_at: {
    type: Date,
    required: true,
  },
  length: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  payload: {
    type: Object,
    default: {},
  },
})

const WatchSchema = new Schema({
  _id: {
    required: true,
    type: String,
  },
  serial: {
    required: true,
    type: String,
  },
  vendor: {
    required: true,
    type: String,
  },
  messages: [MessageSchema],
  inserted_at: {
    default: Date.now,
    type: Date,
  },
  updated_at: {
    default: Date.now,
    type: Date,
  },
})

module.exports = mongoose.model("Watch", WatchSchema, "Watches")
