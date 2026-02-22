const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const auth = require("../middleware/auth");
const checkAuthorOrAdmin = require("../middleware/checkAuthorOrAdmin");
const User = require("../models/User");

const upload = require("../utils/cloudinary");

// Create Post (Auth required) Image support
router.post("/", auth, upload.array("images", 2), async (req, res) => {
  try {
    const { title, content, tags, category } = req.body;
    const imageUrls = req.files?.map((file) => file.path) || []; //Cloudinary returns `file.path
    const newPost = new Post({
      title,
      content,
      tags,
      category,
      images: imageUrls,
      author: req.user.id,
    });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to create post" });
  }
});
// get all posts (with pagination and filter)
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 9, tag, category } = req.query;
    const filter = {};
    if (tag) filter.tags = tag;
    if (category) filter.category = category;

    const posts = await Post.find(filter)
      .populate("author", "username avatar")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// Patch /api/posts/react/:postId
router.patch("/react/:postId", auth, async (req, res) => {
  try {
    const { emoji } = req.body;
    const post = await Post.findById(req.params.postId);

    if (!post) return res.status(404).json({ error: "Post not found" });

    if (!["👍", "❤️", "😂", "😢"].includes(emoji)) {
      return res.status(400).json({ error: "Invalid emoji" });
    }

    const existing = post.reactions.find(
      (r) => r.user.toString() === req.user.id,
    );
    if (existing) {
      existing.emoji = emoji; // update
    } else {
      post.reactions.push({ user: req.user.id, emoji });
    }

    await post.save();
    res.json({ message: "Reaction updated", reactions: post.reactions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update reaction" });
  }
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
      .select("title thumbnail createdAt images");

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get bookmarked posts (Paginated)
router.get("/bookmarks", auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    const totalBookmarks = user.bookmarks.length;

    // Sort bookmarks if we had a field, but since it's just an array of IDs,
    // we'll slice for pagination based on the order in the array (usually recent first if we used push/addToSet)
    const paginatedIds = user.bookmarks
      .slice()
      .reverse() // show latest first
      .slice((page - 1) * limit, page * limit);

    const bookmarkedPosts = await Post.find({ _id: { $in: paginatedIds } })
      .populate("author", "username")
      .sort({ createdAt: -1 });

    res.json({
      bookmarks: bookmarkedPosts,
      totalPage: Math.ceil(totalBookmarks / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Fetch bookmarks error:", error);
    res.status(500).json({ error: "Failed to fetch bookmarks" });
  }
});

// Get Single post by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Safely increment view count
    await Post.findByIdAndUpdate(id, { $inc: { views: 1 } });

    // Fetch updated post
    const post = await Post.findById(id).populate("author", "username avatar");

    if (!post) return res.status(404).json({ error: "Post not found" });

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
      { new: true },
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
    res.status(500).json({ error: "Failed to delete post" });
  }
});
// bookmark article
router.patch("/bookmark/:postId", auth, async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    const user = await User.findById(userId);
    const post = await Post.findById(postId);

    if (!user || !post) {
      return res.status(404).json({ error: "User or Post not found" });
    }

    const isBookmarked = user.bookmarks.includes(postId);

    if (isBookmarked) {
      // Unbookmark
      user.bookmarks.pull(postId);
      post.bookmarks.pull(userId);
    } else {
      // Bookmark
      user.bookmarks.addToSet(postId);
      post.bookmarks.addToSet(userId);
    }

    await Promise.all([user.save(), post.save()]);

    res.json({
      message: isBookmarked ? "Removed from bookmarks" : "Post bookmarked",
      isBookmarked: !isBookmarked,
      bookmarkCount: post.bookmarks.length,
    });
  } catch (error) {
    console.error("Bookmark error:", error);
    res.status(500).json({ error: "Failed to update bookmark" });
  }
});

module.exports = router;
