const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const decoded = jwt.verify(token, process.env.key);
    if (decoded) {
      const userId = decoded.userId;
      req.body.userId = userId;
      next();
    } else {
      res.send("Please login first");
    }
  } else {
    res.send("Please login first");
  }
};

module.exports = authenticate;
