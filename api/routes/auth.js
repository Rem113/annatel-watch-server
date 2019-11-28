const router = require("express").Router();
const bcrypt = require("bcryptjs");

const User = require("../../database/models/User");
const validateUser = require("../../core/utils/validateUser");

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!validateUser(email, password))
    return res.status(400).json({ error: "Please enter valid informations" });

  const user = await User.findOne({ email });

  if (user)
    return res
      .status(409)
      .json({ error: "A user with the same e-mail already exists" });

  const newUser = new User({
    email
  });

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  newUser.password = hash;
  const dbUser = await newUser.save();

  return res.status(201).json({ success: "A new user has been created" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!validateUser(email, password))
    return res.status(400).json({ error: "Please enter valid informations" });

  const user = await User.findOne({ email });

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) return res.status(400).json({ error: "Password is incorrect" });
  return res.status(200).json({ success: "Successfully logged in" });
});

module.exports = router;
