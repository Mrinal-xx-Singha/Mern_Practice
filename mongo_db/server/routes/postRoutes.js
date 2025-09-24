const express = require("express");
const Post = require("../models/Post");
const protect = require("../middleware/auth");
const router = express.Router();

// CREATE A POST
router.post("/", protect, async (req, res) => {
  try {
    const { title, content, user } = req.body;

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
router.get("/", protect, async (req, res) => {
  try {
    const posts = await Post.find().populate("user", "name email");
    res.json(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", protect, async (req, res) => {
  try {
    const { id } = req.params;
    await Post.findByIdAndDelete(id);
    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
