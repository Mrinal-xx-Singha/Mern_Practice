import express from "express";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT;
const app = express();

app.use((req, res) => {
  res.send("Hello Cart server!!");
});

app.listen(PORT, () => {
  console.log("Server is running on ");
});
