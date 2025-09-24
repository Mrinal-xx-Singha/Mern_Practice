const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.get("/", async (req, res) => {
  try {
    res.send("Hello World!!");
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
});

mongoose
  .connect("mongodb://localhost:27017/testDB")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.err(err.message);
    process.exit(1);
  });

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
