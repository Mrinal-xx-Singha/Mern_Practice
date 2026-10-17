const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment")
const auth = require("../middleware/auth");
const checkOwnerOrAdmin = require("../middleware/checkOwnerOrAdmin");
const validate = require("../middleware/validate")
const { createCommentSchema } = require("../schema/commentSchema");
const { addComment, deleteComment, getComment, likeComment } = require("../controllers/commentsController");



// Add a comment or reply
router.post("/:postId", auth, validate(createCommentSchema), addComment);

// Delete a comment (author or admin)
router.delete("/:commentId", auth, checkOwnerOrAdmin(Comment, "commentId"), deleteComment);

// Get comments for a post
router.get("/post/:postId", getComment);

// Like comment
router.patch("/like/:commentId", auth, likeComment);

module.exports = router;
