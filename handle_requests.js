const { serialize, deserialize } = require("annatel-watch-parser");
const Action = require("./models/action");
const Watch = require("./models/watch");
const buildResponse = require("./build_response");

const expectReaction = ["LK", "AL", "WAD", "WG"];

const commitActionToDB = async action => {
  const watch = await Watch.findOne({ watchId: action.watchId });

  if (!watch) throw "Error";

  Action.create({ ...action, watchId: watch._id }).then(data =>
    console.log(data, " logged to database !")
  );
};

const respondToAction = async (action, socket) => {
  const response = buildResponse(action);
  const strRes = serialize(response);

  socket.write(strRes);
};

module.exports = socket => {
  socket.on("data", data => {
    const action = deserialize(data.toString());

    commitActionToDB(action);

    if (expectReaction.includes(action.actionType))
      respondToAction(action, socket);
  });
};
