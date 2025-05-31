const mongoose = require("mongoose");

// Defines the structure of your document

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: { type: String, required: true }
  },
  {
    timestamps: true,
  }
);

// Creating a model
const User = mongoose.model("User", userSchema);
module.exports = User;
