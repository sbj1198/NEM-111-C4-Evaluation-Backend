const express = require("express");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { name, email, gender, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).send({ mssg: "Email already registered" });
    } else {
      bcrypt.hash(req.body.password, 6, async (err, hash) => {
        if (err) return res.send(err);
        const user = await User.create({ name, email, password: hash, gender });
        res.status(201).send("Registered successfully");
      });
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign({ userId: User._id }, process.env.key);
          res.status(200).send({
            mssg: "Login successfull",
            token: token,
          });
        } else {
          res.status(400).send("Wrong credentials");
        }
      });
    } else {
      return res.status(400).send("Email not found!");
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = userRouter;
