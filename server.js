const net = require("net");
const handleRequests = require("./handleRequests");

const server = net.createServer();

const port = 5088;

server.listen(port, () => console.log("Listening on port " + port));

server.on("connection", socket => {
  handleRequests(socket);
});
