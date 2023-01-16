const express = require("express");
const connection = require("./configs/db");
const cors = require("cors");
const userRouter = require("./routes/user.router");
const postRouter = require("./routes/post.router");
const authenticate = require("./middlewares/auth.middleware");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/users", userRouter);
app.use(authenticate);
app.use("/posts", postRouter);

app.listen(process.env.port, async () => {
  try {
    await connection();
    console.log("Connected to the MongoDB");
  } catch (e) {
    console.log(e.message);
  }
  console.log(`Server running at port ${process.env.port}`);
});
