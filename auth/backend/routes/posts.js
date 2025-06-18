const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const auth = require("../middleware/auth");
const checkAuthorOrAdmin = require("../middleware/checkAuthorOrAdmin");

// Create Post (Auth required)
router.post("/", auth, async (req, res) => {
  try {
    const { title, content, tags, category } = req.body;
    const newPost = new Post({
      title,
      content,
      tags,
      category,
      author: req.user.id,
    });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ error: "Failed to create post" });
  }
});
