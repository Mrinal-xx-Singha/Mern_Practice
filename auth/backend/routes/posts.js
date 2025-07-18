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
// get all posts (with pagination and filter)
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10, tag, category } = req.query;
    const filter = {};
    if (tag) filter.tags = tag;
    if (category) filter.category = category;

    const posts = await Post.find(filter)
      .populate("author", "username")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// Get Single post bt ID

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id).populate("author", "username");

    if (!post) return res.status(404).json({ error: "Post not found" });

    post.views += 1;
    await post.save();

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch post" });
  }
});

// Update Post (Author only)
router.put("/:id", auth, checkAuthorOrAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: "Failed to update post" });
  }
});

// Delete Post (Author or Admin)
router.delete("/:id", auth, checkAuthorOrAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found " });
    }
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ eror: "Failed to delete post" });
  }
});

// Patch /api/posts/react/:postId
router.patch("/react/:postId", auth, async (req, res) => {
  const { emoji } = req.body;
  const post = await Post.findById(req.params.postId);

  if (!["👍", "❤️", "😂", "😢"].includes(emoji)) {
    return res.status(400).json({ error: "Invalid emoji" });
  }

  const existing = post.reactions.find(
    (r) => r.user.toString() === req.user.id
  );
  if (existing) {
    existing.emoji = emoji; // update
  } else {
    post.reactions.push({ user: req.user.id, emoji });
  }

  await post.save();
  res.json({ message: "Reaction updated", reactions: post.reactions });
});

router.get("/author/:authorId", auth, async (req, res) => {
  const { authorId } = req.params;
  const { exclude } = req.query;

  try {
    const posts = await Post.find({
      author: authorId,
      _id: { $ne: exclude },
    })
      .limit(3)
      .sort({ createdAt: -1 })
      .select("title thumbnail createdAt");

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
