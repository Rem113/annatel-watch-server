const parse = require("annatel-watch-parser");

module.exports = socket => {
  socket.on("data", data => {
    console.log(`Raw data: ${data.toString()}\n`);
    console.log(parse(data.toString()));
  });
};
