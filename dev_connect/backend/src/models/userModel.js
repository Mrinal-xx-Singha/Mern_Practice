const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    emailId: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender not valid!");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIQND6lOovzDcBzCIYL-eKPi4n2bQLEWP46g&s",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid Photo URL");
        }
      },
    },
    about: { type: String, default: "This is a default aabout of the user" },
    skill: { type: [String] },
  },
  {
    timestamps: true,
  }
);

// we create a model
// name always start with capital letter
const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
