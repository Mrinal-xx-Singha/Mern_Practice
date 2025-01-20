const express = require("express");
require("dotenv").config();
const validator = require("validator");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const connectDB = require("./config/db");

const userModel = require("./models/userModel");
const { userAuth } = require("./middlewares/auth");

const { validateSignUpData } = require("./utils/validation");

const app = express();
app.use(cookieParser());

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

    const isPasswordValid = user.validatePassword(password);

    if (isPasswordValid) {
      // * Create a jwt token

      // * hide the user id and send a secretkey
      // * offloaded the logic to schema method

      const token = await user.getJWT();

      // * Add the token to cookie and send the response back to the user

      res.cookie("token", token);
      res.send("User Login Successfull !");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    res.status(400).send("Error :" + error.message);
  }
});

//Profile Api
app.get("/profile", userAuth, async (req, res) => {
  try {
    // const cookies = req.cookies;

    // const { token } = cookies;

    // if (!token) {
    //   throw new Error("Invalid Token!");
    // }

    // * Validate my token

    // const decodedMsg = await jwt.verify(token, "secret");
    // console.log(decodedMsg);
    // const { _id } = decodedMsg;

    // console.log("Logged in user is :" + _id);

    // const user = await userModel.findById(_id);
    const user = req.user;
    // if(!user){
    //   throw new Error("Please log in!")
    // }

    // else please login redirect to login page

    //! console.log(cookies);
    res.send(user);
  } catch (error) {
    res.status(400).send("Error :" + error.message);
  }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  res.status(200).send(user.firstName + "Sent the connection request");
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
