const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const userModel = require("./models/userModel");
const app = express();

// middleware
app.use(express.json());

// Post method

// Signup API
app.post("/signup", async (req, res) => {
  //* creating a new user with the userObj data
  //* creating a new instance of the userModel
  const { firstName, lastName, emailId, password } = req.body;

  const user = new userModel({
    firstName,
    lastName,
    emailId,
    password,
  });

  //* always do try catch for async operation
  try {
    await user.save();
    res.send("User Added Successfully!!");
  } catch (error) {
    res.statusCode(400).send("Error saving the user: ", error.message);
  }
});
// Get all the users from the database API
app.get("/feed", async (req, res) => {
  const singleEmail = req.body.emailId;
  try {
    console.log(singleEmail);
    // const user = await userModel.find({});
    const user = await userModel.findOne({ emailId: singleEmail });
    // if the length of user is zero handled error
    if (user.length === 0) {
      res.status(404).send("User not found");
    } else {
      // send all  the users back
      res.status(200).send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// Delete a user
app.delete("/user", async (req, res) => {
  const userId = req.body.UserId;
  try {
    await userModel.findByIdAndDelete(userId);
    res.status(200).json({ message: "User deleted successfully!!" });
  } catch (error) {
    console.log("Error occured on deleting the user", error.message);
    res.status(400).send("Something went wrong ");
  }
});

// Update data of the user
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const allowedUpdates = ["photoUrl", "about", "gender", "skills", "age"];

    // Pure js
    const isUpdateAllowed = Object.keys(data).every((k) =>
      allowedUpdates.includes(k)
    );

    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }

    if (data.skills.length > 10) {
      throw new Error("Skills cannot be more than 10 ");
    }

    const user = await userModel.findByIdAndUpdate({ _id: userId }, data, {
      runValidators: true,
    });
    console.log(user);
    res.send("User updated successfully");
  } catch (error) {
    res.status(400).send("Update Failed: " + error.message);
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
