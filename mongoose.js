const mongoose = require("mongoose");

mongoose
  .connect("mongodb://admin:gabhil@88.218.220.20:9000/Annatel?authSource=admin")
  .then(() => console.log("Lol"));
