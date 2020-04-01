const { stringToObject, objectToString } = require("annatel-watch-parser");
const Action = require("./models/action");
const Watch = require("./models/watch");
const respondToActionModule = require("./respond_to_action");

const commitActionToDB = async action => {
  let watch = await Watch.findOne({ watchId: action.watchId });

  if (!watch) watch = await Watch.create({ watchId: action.watchId });

  const newAction = new Action({ ...action, watchId: watch._id });

  newAction.save().then(data => console.log(data, " logged to database !"));
};

const respondToAction = async (action, socket) => {
  // here we check if new packets are not been sent to watch
  // const pendingPackets() {...}

  const response = respondToActionModule(action);
  const strRes = objectToString(response);

  socket.write(strRes);
};

module.exports = socket => {
  socket.on("data", data => {
    const action = stringToObject(data.toString());

    commitActionToDB(action);

    respondToAction(action, socket);
  });
};
