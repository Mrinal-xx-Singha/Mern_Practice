const express = require("express");
const Post = require("../models/Post");
const router = express.Router();

// CREATE A POST
router.post("/", async (req, res) => {
  try {
    const { title, content,user } = req.body;

    const post = await Post.create({
      title,
      content,
      user,
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET ALL POSTS
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().populate("user", "name email");
    res.json(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
