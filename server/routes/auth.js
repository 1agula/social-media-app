const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//register
router.post("/register", async (req, res) => {
  try {
    //generate hashed password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    //create new user
    const newUser = await new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });
    //save user
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    //find user
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("user not found");
    //compare password
    const result = await bcrypt.compare(req.body.password, user.password);
    if (result) {
      const tokenObject = { _id: user._id, email: user.email };
      const token = jwt.sign(tokenObject, process.env.PASSPORT_SECRET);
      res.status(200).send({ success: true, token: "JWT " + token, user });
    } else {
      res.status(401).json("wrong password");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
