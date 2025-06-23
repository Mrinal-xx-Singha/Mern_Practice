const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");
const auth = require("./middleware/auth");
const User = require("./models/User");
const commentRoutes = require("./routes/comments");
const cors = require("cors");
dotenv.config();

const app = express();
// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials:true
    
  })
);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MONGO DB Connected ✅"))
  .catch((err) => console.error(err.message));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

// Protected Routes
app.get("/api/protected", auth, async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);
    res.json({ message: `Welcome,  ${user.username}` });
  } catch (error) {
    res.status(400).json({ messsage: "Error occured" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
