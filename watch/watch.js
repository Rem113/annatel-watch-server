const net = require("net");
const handleRequests = require("./handleRequests");

const server = net.createServer();
const watchPort = 5088;

server.listen(watchPort, () =>
  console.log(`Listening for watch on port ${watchPort}`)
);

server.on("connection", socket => {
  handleRequests(socket);
});
