const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");
const commentRoutes = require("./routes/comments");
const User = require("./models/User");
const auth = require("./middleware/auth");
const cors = require("cors");
dotenv.config();

const app = express();
// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
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

app.get("/api/protected", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json({ message: `Welcome, ${user.username}`, user });
  } catch (error) {
    res.status(400).json({ message: "Error occurred" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
