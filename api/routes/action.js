const router = require("express").Router();

const Action = require("../../database/models/Action");

router.get("/", async (req, res) => {
  const actions = await Action.find();
  res.end(JSON.stringify(actions));
});

module.exports = router;
