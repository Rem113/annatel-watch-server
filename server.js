const net = require("net");
const mongooseLoader = require("./mongoose");
const handleRequests = require("./handle_requests");

const server = net.createServer();
const watchPort = 15088;

const main = async () => {
  await mongooseLoader();

  server.listen(watchPort, () =>
    console.log(`Listening for watch on port ${watchPort}`)
  );

  server.on("connection", socket => {
    handleRequests(socket);
  });
};

main();
