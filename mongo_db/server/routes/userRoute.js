const mongoose = require("mongoose");
const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.post("/user", async (req, res) => {
  const { email, name } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already Exists. " });
    }

    const user = new User({
      name,
      email,
    });
    await user.save();
    res.status(201).json({ message: "User Created successfully !" });
  } catch (error) {
    res.status(500).json({message:"Internal Server Error"})
  }
});

router.get("/user", async (req, res) => {
  try {
    const user = await User.find();
    console.log(user);
    res.status(200).json({ message: "Found users" , user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
