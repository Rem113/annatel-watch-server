const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb://admin:gabhil@88.218.220.20:9000/Annatel?authSource=admin",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error(err));
