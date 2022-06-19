const router = require("express").Router();
const User = require("../models/user");
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken')

//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });
    !user && res.status(401).json("wrong username");

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    originalPassword != req.body.password &&
      res.status(401).json("wrong password");

      const accessToken = jwt.sign(
        {
            id : user._id,
            isAdmin : user.isAdmin
        },
        process.env.JWT_SEC,
        {expiresIn : "7d"}
       )

    res.status(200).json({user,accessToken});
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
