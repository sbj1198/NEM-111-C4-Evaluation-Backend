const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: { type: String },
  body: { type: String },
  device: { type: String },
  userId: { type: String },
});

module.exports = Post = mongoose.model("post", postSchema);
