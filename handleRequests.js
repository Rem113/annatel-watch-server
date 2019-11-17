const parse = require("annatel-watch-parser");
const Action = require("./models/Action");

const handleAction = action => {
  const actionObj = parse(action);

  console.log("Raw data: ", action.toString());
  console.log(actionObj);

  const newAction = new Action({
    ...actionObj,
    watchId: actionObj.id
  });

  newAction.save().then(data => console.log(data, " logged to database !"));
};

module.exports = socket => {
  socket.on("data", data => {
    handleAction(data.toString());
  });
};
