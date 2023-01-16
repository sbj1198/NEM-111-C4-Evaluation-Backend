const express = require("express");
const Post = require("../models/post.model");

const postRouter = express.Router();

postRouter.get("/", async (req, res) => {
  try {
    const post = await Post.find();
    if (post.userId === req.body.userId) {
      return res.status(200).send(post);
    } else {
      return res.send("You are not authorized");
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
});

postRouter.patch("/update", (req, res) => {
  res.send("hello");
});

postRouter.delete("/delete", (req, res) => {
  res.send("hello");
});

module.exports = postRouter;
