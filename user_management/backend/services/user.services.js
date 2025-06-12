const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async ({ name, email, password }) => {
  const existing = await User.findOne({ email });

  if (existing) throw new Error("Email already exists");
  const user = new User({ name, email, password });
  return await user.save();
};

exports.login = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) throw new Error("User not found");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid credentials");

  const payload = { id: user._id, email: user.email };
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};
