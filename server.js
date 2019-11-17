const net = require("net");
const handleRequests = require("./handleRequests");

const server = net.createServer();
const port = 5088;

server.listen(port, () => console.log("Listening on port " + port));

server.on("connection", socket => {
  handleRequests(socket);
});

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://admin:gabhil@88.218.220.20:9000/Annatel?authSource=admin")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error(err));
