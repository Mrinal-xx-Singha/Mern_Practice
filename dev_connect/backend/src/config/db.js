// mongoose is used to connectect to database
const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
};

module.exports = connectDB;
