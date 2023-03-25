const express = require("express");
const { UserModel } = require("../Models/user.model");
const userRouter = express.Router();
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
userRouter.post("/register", async (req, res) => {
  const { email, location, age, password } = req.body;

  try {
    bcrypt.hash(password, 3, async (err, hash) => {
      const user = new UserModel({ email, password: hash, location, age });
      await user.save();
      res.status(200).send({ msg: "registration done" });
    });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.find({ email });
    // console.log("hera", user);
    console.log("hear", user[0]._id);
    const token = jwt.sign({ userId: user[0]._id }, "shhhhh");
    // console.log(token);
    if (user.length) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (result) {
          console.log(token);
          res.status(200).send({ msg: "login done", token: token });
        } else {
          res.status(400).send({ msg: "wrong creditials" });
        }
      });
    } else {
      res.send("no user found");
    }
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

module.exports = { userRouter };
