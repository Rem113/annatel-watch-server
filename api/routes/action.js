const router = require("express").Router();
const passport = require("passport");

const Action = require("../../database/models/Action");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const actions = await Action.find();
    res.end(JSON.stringify(actions));
  }
);

module.exports = router;
