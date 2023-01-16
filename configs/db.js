const mongoose = require("mongoose");
require("dotenv").config();

const connection = () => {
  return mongoose.connect(process.env.mongoURL);
};

module.exports = connection;
