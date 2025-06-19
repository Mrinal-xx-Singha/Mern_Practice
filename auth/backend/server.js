const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts")
const auth = require("./middleware/auth");
const User = require("./models/User");

dotenv.config();

const app = express();
// Middleware
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MONGO DB Connected ✅"))
  .catch((err) => console.err(err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts",postRoutes)

// Protected Routes
app.get("/api/protected", auth, async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);
    res.json({ message: `Welcome,  ${user.username}` });
  } catch (error) {
    res.status(400).json({messsage:"Error occured"})
  }

});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
