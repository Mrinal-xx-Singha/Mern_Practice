const mongoose = require("mongoose");
const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const router = express.Router();

/**
 *  Login:
 * User sends email/password
 * Backend verifies email exists
 * Compares hashed password using bcrypt.compare()
 * If valid, generate & return a JWT token
 */

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }
    const user = new User({
      email,
      password,
    });
    await user.save();

    res.status(201).json({ message: "User Created Successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, "secret", {
      expiresIn: "7d",
    });

    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({ msg: "Logged in successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
});
module.exports = router;
