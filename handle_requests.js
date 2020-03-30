const { stringToObject, objectToString } = require("annatel-watch-parser");
const Action = require("./models/action");
const Watch = require("./models/watch");

const responseType = [
  "LK",
  "AL",
  "UPLOAD",
  "MONITOR",
  "CENTER",
  "SLAVE",
  "PW",
  "CALL",
  "SMS",
  "SOS",
  "SOS1",
  "SOS2",
  "SOS3",
  "UPGRADE",
  "FACTORY",
  "LZ",
  "SOSSMS",
  "LOWBAT",
  "APN",
  "ANY",
  "RESET",
  "REMOVE"
];

const anyResponseType = ["UD", "UD2", "IP"];

const resetResponseType = ["CR", "BT", "WORK", "WORKTIME", "POWEROFF"];

const differentResponseType = ["WAD", "WG", "URL", "TS", "VERNO", "PULSE"];

// **** FUNCTIONS ***** //

const commitActionToDB = async action => {
  let watch = await Watch.find({ watchId: action.watchId });

  if (!watch) watch = await Watch.create({ watchId: action.watchId });

  const newAction = new Action({ ...action, watchId: watch.watchId });

  newAction.save().then(data => console.log(data, " logged to database !"));
};

const respondToAction = async (action, socket, otherType) => {
  const header = {
    vendor: action.vendor,
    watchId: action.watchId,
    length: action.actionType.length,
    actionType: action.actionType
  };

  // If we're dealing with another response type
  if (otherType != null) {
    header.actionType = otherType;
    header.length = otherType.length;
  }

  const strRes = objectToString(header);
  socket.write(strRes);
};

const respondToActionDifferent = (action, socket) => {};

module.exports = socket => {
  socket.on("data", data => {
    const action = stringToObject(data.toString());

    commitActionToDB(action);

    if (anyResponseType.includes(action.actionType)) 1 == 1;
    // Do Nothing
    else if (responseType.includes(action.actionType))
      respondToAction(action, socket, null);
    else if (resetResponseType.includes(action.actionType))
      respondToAction(action, socket, "RESET");
    else if (differentResponseType.includes(action.actionType))
      respondToActionDifferent(action, socket);
  });
};
