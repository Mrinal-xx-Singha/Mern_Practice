const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const userModel = require("./models/userModel");
const app = express();

// middleware
app.use(express.json());

// Post method
app.post("/signup", async (req, res) => {
  //* creating a new user with the userObj data
  //* creating a new instance of the userModel

  const user = new userModel({
    firstName: "Virat",
    lastName: "Kohli",
    emailId: "Virat@email.com",
    password: "password12",
  });
  //* always do try catch for async operation
  try {
    await user.save();
    res.send("User Added Successfully!!");
  } catch (error) {
    res.statusCode(400).send("Error saving the user: ", error.message);
  }
});

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
