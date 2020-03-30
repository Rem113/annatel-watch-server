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

module.exports = socket => {
  socket.on("data", data => {
    // Handling Query
    const action = stringToObject(data.toString());

    commitActionToDB(action);

    // Handling Response
    if (anyResponseType.includes(action.actionType)) 1 == 1;
    // Do Anything
    else if (responseType.includes(action.actionType))
      respondToAction(action, socket, null);
    else if (resetResponseType.includes(action.actionType))
      respondToAction(action, socket, "RESET");
    else if (differentResponseType.includes(action.actionType))
      respondToActionDifferent(action, socket);
  });
};

const commitActionToDB = action => {
  const newAction = new Action(action);

  newAction.save().then(data => console.log(data, " logged to database !"));
};

const respondToAction = async (action, socket, otherType) => {
  let watch = await Watch.find({ id: action.watchId });

  if (!watch) watch = await Watch.create({ id: action.watchId });

  const header = {
    vendor: action.vendor,
    watchId: watch._id,
    length: action.actionType.length,
    actionType: action.actionType
  };

  // If the response type is different from the querying one
  if (otherType != null) {
    header.actionType = otherType;
    header.length = otherType.length;
  }

  const strRes = objectToString(header);
  socket.write(strRes);
};

const respondToActionDifferent = (action, socket) => {};
