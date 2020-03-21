const { stringToObject, objectToString } = require("annatel-watch-parser");
const Action = require("./models/action");

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
  "SOSSMS",
  "UPGRADE",
  "FACTORY",
  "LZ",
  "URL",
  "LOWBAT",
  "APN",
  "ANY",
  "TS",
  "VERNO",
  "RESET",
  "BT",
  "WORK",
  "WORKTIME",
  "REMOVE",
  "PULSE"
];

const commitActionToDB = action => {
  const newAction = new Action(action);

  newAction.save().then(data => console.log(data, " logged to database !"));
};

const respondToAction = (action, socket) => {
  const header = {
    vendor: action.vendor,
    watchId: action.watchId,
    length: action.actionType.length,
    actionType: action.actionType
  };

  switch (action.actionType) {
    case "LK":
      const strRes = objectToString(header);
      socket.write(strRes);
      break;
  }
};

module.exports = socket => {
  socket.on("data", data => {
    const action = stringToObject(data.toString());

    commitActionToDB(action);

    if (responseType.includes(action.actionType)) {
      respondToAction(action, socket);
    }
  });
};
