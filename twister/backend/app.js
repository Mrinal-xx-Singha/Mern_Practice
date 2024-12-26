// Importing required modules
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Blog = require("./models/blog.model");
const User = require("./models/user.model");

const connectDB = require("./utils/db");
// Initializing dotenv
dotenv.config();

// Constants
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;

// Initializing express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes

// User registration
app.post("/api/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error registering user", details: err.message });
  }
});

// User login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ token });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error logging in user", details: err.message });
  }
});

// Create a blog post
app.post("/api/blogs", async (req, res) => {
  const { title, content, author } = req.body;
  try {
    const newBlog = new Blog({ title, content, author });
    await newBlog.save();
    res
      .status(201)
      .json({ message: "Blog created successfully", blog: newBlog });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error creating blog", details: err.message });
  }
});

// Fetch all blogs
app.get("/api/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "username email");
    res.status(200).json(blogs);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error fetching blogs", details: err.message });
  }
});

// Fetch a specific blog by ID
app.get("/api/blogs/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      "author",
      "username email"
    );
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.status(200).json(blog);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error fetching blog", details: err.message });
  }
});

// Update a blog post
app.put("/api/blogs/:id", async (req, res) => {
  const { title, content } = req.body;
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, content, updatedAt: Date.now() },
      { new: true }
    );
    if (!updatedBlog) return res.status(404).json({ error: "Blog not found" });
    res
      .status(200)
      .json({ message: "Blog updated successfully", blog: updatedBlog });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error updating blog", details: err.message });
  }
});

// Delete a blog post
app.delete("/api/blogs/:id", async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) return res.status(404).json({ error: "Blog not found" });
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error deleting blog", details: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
