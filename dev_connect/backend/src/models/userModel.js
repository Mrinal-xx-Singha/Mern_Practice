const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, minLength: 4, maxLength: 50 },
    lastName: { type: String },
    emailId: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email address");
        }
      },
    },
    password: {
      type: String,
      required: true,

      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Your password is not strong");
        }
      },
    },
    age: { type: Number, min: 15 },
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
    about: { type: String, default: "This is a default about of the user" },
    skills: { type: [String] },
  },
  {
    timestamps: true,
  }
);
/**
 * * Mongoose Schema Methods
 * * Helper function
 * * Makes the function reusable,modular,cleaner
 */
userSchema.methods.getJWT = async function () {
  // all documents are instances of userModel
  // arrow function will not work

  const user = this;

  const token = await jwt.sign({ _id: user._id }, "secret", {
    expiresIn: "7d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  //  * user is the instance of userModel
  const user = this;
  // * the password is already hashed and saved in mondodb
  const passWordHash = user.password;

  // * dont interchange the order
  const isPasswordValid = await bcrypt.compare(
    // * password input given by user
    passwordInputByUser,
    // * hashedpassword to be compared
    passWordHash
  );
  return isPasswordValid;
};

// we create a model
// name always start with capital letter
const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
