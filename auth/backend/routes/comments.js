const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");
const Post = require("../models/Post");
const auth = require("../middleware/auth");

// Add a comment (or reply)
router.post("/:postId", auth, async (req, res) => {
  const { content, parentId } = req.body;

  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    const newComment = new Comment({
      content,
      author: req.user.id,
      post: req.params.postId,
      parent: parentId || null,
    });

    const savedComment = await newComment.save();

    // Link this as a reply if pareant exists
    if (parentId) {
      await Comment.findByIdAndUpdate(parentId, {
        $push: { replies: savedComment._id },
      });
    }

    res.status(201).json(savedComment);
  } catch (error) {
    res.status(500).json({ error: "Failed to post comment" });
  }
});

// Delete a comment (author or admin)
router.delete("/:commentId", auth, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId).populate(
      "auhor"
    );

    if (!comment) return res.status(404).json({ error: "Comment not found " });

    if (
      comment.author._id.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    // If this is a reply, remove from parents reply array
    if (comment.parent) {
      await Comment.findByIdAndUpdate(comment.parent, {
        $pull: { replies: comment._id },
      });
    }
    // recursively delete nested replies (if any)

    await Comment.deleteMany({ parent: comment._id });

    await comment.deleteOne();

    res.json({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete comment" });
  }
});

// Get comments for a post
router.get("/post/:postId", async (req, res) => {
  try {
    const comments = await Comment.find({
      post: req.params.postId,
      parent: null,
    })
      .populate("author", "username avatar")
      .populate({
        path: "replies",
        populate: {
          path: "author",
          select: "username avatar",
        },
      })
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: "Failed to load comments" });
  }
});

module.exports = router;
