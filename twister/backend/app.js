require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const connectDB = require("./utils/db");

const User = require("./models/user.model");


const {authenticateToken} = require('./utils/utils')

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "*" }));

// Routes

//Create user account
app.post("/create-account", async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const isUser = await User.findOne({ email });
  if (isUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    fullName,
    email,
    password: hashedPassword,
  });
  await user.save();
  const accessTOken = jwt.sign(
    { userId: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "72h",
    }
  );

  return res.status(201).json({
    user: { fullName: user.fullName, email: user.email },
    accessTOken,
    message: "Registration Successfull",
  });
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and Password are required" });
  }
  const user = await User.findOne({ email });

  //check user exists or not
  if (!user) {
    return res.status(400).json({ message: "User not found " });
  }

  // Check password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid Credentials" });
  }

  // accessToken  
  const accessToken = jwt.sign(
    { userId: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "72h",
    }
  );
  return res.json({
    message: "Login Successful",
    user: { fullName: user.fullName, email: user.email },
    accessToken,
  });
});

// Get User
app.get('/get-user',authenticateTokens,async(req,res)=>{
  const {userId} = req.user

  const isUser = await User.findOne({_id: userId})

  if(!isUser){
    return res.sendStatus(401)
  }
  return res.json({
    user:isUser,
    message:''
  })

})


// Add Travel Story
app.get('/add-travel',async(req,res)=>{


})





// Define the PORT with a default value
const PORT = process.env.PORT;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
