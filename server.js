const net = require("net");
const express = require("express");
const handleRequests = require("./handleRequests");

const server = net.createServer();
const watchPort = 5088;

server.listen(watchPort, () =>
  console.log(`Listening for watch on port ${watchPort}`)
);

server.on("connection", socket => {
  handleRequests(socket);
});

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://admin:gabhil@88.218.220.20:9000/Annatel?authSource=admin")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error(err));

const app = express();
const restPort = 8000;

app.listen(restPort, () =>
  console.log(`Listening for API requests on port ${restPort}`)
);

const Action = require("./models/Action");

app.get("/", async (req, res) => {
  const actions = await Action.find();
  res.end(JSON.stringify(actions));
});
