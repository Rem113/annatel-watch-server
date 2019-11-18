const express = require("express");
const app = express();
const restPort = 8000;

app.listen(restPort, () =>
  console.log(`Listening for API requests on port ${restPort}`)
);

app.get("/api/action", require("./routes/action"));
