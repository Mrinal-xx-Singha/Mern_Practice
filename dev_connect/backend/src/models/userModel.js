const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  emailId: { type: String, required: true },
  password: { type: String, required: true },
  age: { type: Number },
  gender: { type: String },
});

// we create a model
// name always start with capital letter
const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
