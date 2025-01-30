const express = require("express");
const authRouter = express.Router();
const userModel = require("../models/userModel");
const validator = require("validator");
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");

//* SIGNUP API
authRouter.post("/signup", async (req, res) => {
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

//* LOGIN API
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    if (!validator.isEmail(emailId)) {
      throw new Error("Email not valid");
    }
    // find the user
    const user = await userModel.findOne({ emailId: emailId });

    // if user not present in the database

    if (!user) {
      throw new Error("Email id is not present in db");
    }

    const isPasswordValid = await user.validatePassword(password);
    const token = await user.getJWT();
    res.cookie("token", token, { expires: new Date(Date.now() + 900000) });

    if (isPasswordValid) {
      // * Create a jwt token

      // * hide the user id and send a secretkey
      // * offloaded the logic to schema method

      // * Add the token to cookie and send the response back to the user

      res.status(200).send("User Login Successfull !");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    res.status(400).send("Error :" + error.message);
  }
});

//* LOGOUT APIS
authRouter.post("/logout", async (req, res) => {
  try {
    // set the  jwt token to null
    res.cookie("token", null, {
      // expire it then and there
      expires: new Date(Date.now()),
    });

    res.status(200).send("User Logged out successfully !!");
  } catch (error) {
    res.status(400).send("Error:" + error.message);
  }
});

module.exports = { authRouter };
