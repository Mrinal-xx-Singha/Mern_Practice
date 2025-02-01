const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");

const { authRouter } = require("./routes/authRouter");
const { profileRouter } = require("./routes/profileRouter");
const { requestRouter } = require("./routes/requestRouter");
const { userRouter } = require("./routes/userRouter");

const app = express();
app.use(cookieParser());

// middleware
app.use(express.json());

// Route Handler
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDB()
  .then(() => {
    console.log("Connected to Database");
    app.listen(5000, () => {
      console.log("Server running on PORT: 5000");
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected");
  });
