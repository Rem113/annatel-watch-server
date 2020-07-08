const { serialize, deserialize } = require("annatel-watch-parser")
const Command = require("./models/command")
const Watch = require("./models/watch")
const buildResponse = require("./build_response")
const { default: Axios } = require("axios")

const expectReaction = ["LK", "AL", "WAD", "WG"]

const respondToAction = async (action, socket) => {
  const response = buildResponse(action)
  const strRes = serialize(response)

  socket.write(strRes)
}

const sendCommands = async (socket, watchId) => {
  const watch = await Watch.findOne({ _id: watchId })
  const commands = await Command.find({ watchId: watch._id, processed: false })

  for await (const command of commands) {
    socket.write(serialize(command.command))
    command.processed = true
    command.updatedAt = new Date()
    command
      .save()
      .then((command) => console.log(command + " has been processed"))
  }
}

module.exports = (socket) => {
  socket.on("data", async (data) => {
    const action = deserialize(data.toString())

    await Axios.post("http://88.218.220.20:3000/api/watch/message", {
      serial: action.watchId,
      vendor: action.vendor,
      type: action.actionType,
      length: action.length,
    })
      .then((res) => console.log(res))
      .catch((err) => console.error(err))

    if (expectReaction.includes(action.actionType))
      respondToAction(action, socket)

    sendCommands(socket, action.watchId)
  })
}
