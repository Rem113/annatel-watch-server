const { stringToObject, objectToString } = require("annatel-watch-parser");
const Action = require("../database/models/Action");

const responseType = ["LK"];

const commitActionToDB = action => {
  const newAction = new Action({
    ...action
  });

  newAction.save().then(data => console.log(data, " logged to database !"));
};

const respondToAction = (action, socket) => {};

module.exports = socket => {
  socket.on("data", data => {
    const action = stringToObject(action.toString());

    commitActionToDB(action);

    if (responseType.includes(actionObj.actionType)) {
      respondToAction(action, socket);
    }
  });
};
