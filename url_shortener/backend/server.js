const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const urlRoutes = require("./routes/urlRoutes")
dotenv.config();

const app = express();
app.use(express.json())

app.use("/",urlRoutes);

app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`Server is running on ${process.env.PORT}`);
});
