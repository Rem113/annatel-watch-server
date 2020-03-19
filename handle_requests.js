const { stringToObject, objectToString } = require("annatel-watch-parser");
const Action = require("./models/action");

const responseType = ["LK"];

const commitActionToDB = action => {
  const newAction = new Action(action);

  newAction.save().then(data => console.log(data, " logged to database !"));
};

const respondToAction = (action, socket) => {
  const header = {
    vendor: action.vendor,
    watchId: action.watchId,
    length: action.length,
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
