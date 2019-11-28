const express = require("express");
const app = express();
const passport = require("passport");
const bodyParser = require("body-parser");
const restPort = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(passport.initialize());
require("./config/passport.config")(passport);

app.use("/api/action", require("./routes/action"));
app.use("/api/auth", require("./routes/auth"));

app.listen(restPort, () =>
  console.log(`Listening for API requests on port ${restPort}`)
);
