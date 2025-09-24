import express from "express";
import dotenv from "dotenv";
import Razorpay from "razorpay"

dotenv.config();

const app = express();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
