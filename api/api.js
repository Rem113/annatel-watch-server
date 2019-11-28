const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const restPort = 8000;

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(restPort, () =>
  console.log(`Listening for API requests on port ${restPort}`)
);

app.use("/api/action", require("./routes/action"));
app.use("/api/auth", require("./routes/auth"));
