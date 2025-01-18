const express = require("express");
require("dotenv").config();
const validator = require("validator");
const bcrypt = require("bcrypt");

const connectDB = require("./config/db");

const userModel = require("./models/userModel");

const { validateSignUpData } = require("./utils/validation");

const app = express();

// middleware
app.use(express.json());

// Post method

// Signup API
app.post("/signup", async (req, res) => {
  // *creating a new instance of the userModel
  // *validation of data
  /**
   * * encrypt password
   * * then store password in the database
   *
   */
  //* always do try catch for async operation
  try {
    // validatate the request
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;

    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    // console.log(passwordHash); // *$2b$10$tqSV3epZ1RTI64sE2jpmM.guOXx5.aaFiTV1BD9NyK/R6QJ8SqoMW

    //* creating a new user with the userObj data
    const user = new userModel({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("User Added Successfully!!");
  } catch (error) {
    res.status(400).send("Error :" + error.message);
  }
});

// Login API
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!validator.isEmail(emailId)) {
      throw new Error("Email not valid");
    }
    // find the user
    const user = await userModel.findOne({ emailId: emailId });

    // if user not present in the database

    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isPasswordValid = bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      res.send("User Login Successfull !");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    res.status(400).send("Error :" + error.message);
  }
});

// Get all the users from the database API
app.get("/feed", async (req, res) => {
  const singleEmail = req.body.emailId;
  try {
    // const user = await userModel.find({});
    const user = await userModel.findOne({});
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
  const userId = req.params?.userId; //Extract userId from params
  const data = req.body; // Extract data from the request body

  try {
    const allowedUpdates = ["photoUrl", "about", "gender", "skill", "age"];

    // Pure js
    // Validate the all keys in `data` are allowed updates
    const isUpdateAllowed = Object.keys(data).every((k) =>
      allowedUpdates.includes(k)
    );

    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }

    if (data.skill && data.skill.length > 10) {
      throw new Error("Skills cannot be more than 10 ");
    }

    const user = await userModel.findByIdAndUpdate(userId, data, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      throw new Error("User not found");
    }
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
