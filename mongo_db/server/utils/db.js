const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri = await mongoose.connect("mongodb://127.0.0.1:27017/mernApp");

    if (!uri) {
      console.error("Mongo URI is undefined");
    }

    console.log("Mongo DB Connected 🔥");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
