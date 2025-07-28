const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");
const Post = require("../models/Post");
const auth = require("../middleware/auth");
const buildNestedComments = require("../utils/buildNestedComments");

// Add a comment or reply
router.post("/:postId", auth, async (req, res) => {
  const { content, parentId } = req.body;

  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ error: "Post not found" });

    const newComment = new Comment({
      content,
      author: req.user.id,
      post: req.params.postId,
      parent: parentId || null,
    });

    const savedComment = await newComment.save();

    if (parentId) {
      await Comment.findByIdAndUpdate(parentId, {
        $push: { replies: savedComment._id },
      });
    }

    res.status(201).json(savedComment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ error: "Failed to post comment" });
  }
});

// Delete a comment (author or admin)
router.delete("/:commentId", auth, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId).populate(
      "author"
    );

    if (!comment) return res.status(404).json({ error: "Comment not found" });

    const isOwner = comment.author._id.toString() === req.user.id;
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    // Remove from parent's replies if it's a reply
    if (comment.parent) {
      await Comment.findByIdAndUpdate(comment.parent, {
        $pull: { replies: comment._id },
      });
    }

    // Delete nested replies
    await Comment.deleteMany({ parent: comment._id });

    await comment.deleteOne();

    res.json({ message: "Comment deleted" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ error: "Failed to delete comment" });
  }
});

// Get comments for a post
router.get("/post/:postId", async (req, res) => {
  try {
    const rootComments = await Comment.find({
      post: req.params.postId,
      parent: null,
    })
      .populate("author", "username")
      .sort({ createdAt: -1 });

    const nested = await buildNestedComments(rootComments);

    res.json(nested);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Failed to load comments" });
  }
});

router.patch("/like/:commentId", auth, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return res.status(404).json({ error: "Comment not found" });

    const userId = req.user.id;
    const alreadyLiked = comment.likes.includes(userId);

    if (alreadyLiked) {
      comment.likes.pull(userId); //unlike
    } else {
      comment.likes.push(userId); //Like
    }

    await comment.save();
    res.json({ likes: comment.likes.length, liked: !alreadyLiked });
  } catch (error) {
    res.status(500).json({ error: "Failed to update like" });
  }
});

module.exports = router;
