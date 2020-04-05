const mongoose = require("mongoose");
const { Schema } = mongoose;

const actionTypes = [
  "AL",
  "ANY",
  "APN",
  "BT",
  "CALL",
  "CENTER",
  "CR",
  "FACTORY",
  "IP",
  "LK",
  "LOWBAT",
  "LZ",
  "MONITOR",
  "POWEROFF",
  "PULSE",
  "PW",
  "RAD",
  "REMOVE",
  "RESET",
  "RG",
  "SLAVE",
  "SMS",
  "SOS",
  "SOS1",
  "SOS2",
  "SOS3",
  "SOSSMS",
  "TS",
  "UD",
  "UD2",
  "UPGRADE",
  "UPLOAD",
  "URL",
  "VERNO",
  "WAD",
  "WG",
  "WORK",
  "WORKTIME",
];

const Action = new Schema({
  actionType: {
    enum: actionTypes,
    required: true,
    type: Schema.Types.String,
  },
  insertedAt: {
    default: Date.now,
    type: Schema.Types.Date,
  },
  length: {
    required: true,
    type: Schema.Types.Number,
  },
  payload: {
    default: {},
    type: Object,
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

module.exports = mongoose.model("Action", Action, "Actions");
