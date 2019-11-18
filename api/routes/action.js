const Router = require("express").Router();

const Action = require("../models/Action");

Router.get("/", async (req, res) => {
  const actions = await Action.find();
  res.end(JSON.stringify(actions));
});

module.exports = Router;
