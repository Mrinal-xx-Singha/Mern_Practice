const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const auth = require("../middleware/auth");
const checkOwnerOrAdmin = require("../middleware/checkOwnerOrAdmin");
const User = require("../models/User");

const upload = require("../utils/cloudinary");

const validate = require("../middleware/validate")

const {
  createPostSchema,
  updatePostSchema,
  reactionSchema
} = require("../schema/postSchema");
const {
  createPosts,
  getAllPosts,
  deletePost,
  bookmarkArticle,
  updateEmoji,
  getbookmarkedPosts,
  getPost,
  updateView,
  updatePost,
  getAuthorPosts,
} = require("../controllers/postController");
// Create Post (Auth required) Image support
router.post("/", auth, upload.array("images", 2), validate(createPostSchema), createPosts);
// get all posts (with pagination and filter)
router.get("/", getAllPosts);

// Patch /api/posts/react/:postId
router.patch("/react/:postId", auth, validate(reactionSchema), updateEmoji);


// getPosts
router.get("/author/:authorId", getAuthorPosts);

// Get bookmarked posts (Paginated)
router.get("/bookmarks", auth, getbookmarkedPosts);

// Get Single post by ID
router.get("/:id", getPost);

// update view count
router.post("/:id/views", updateView)

// Update Post (Author only)
router.put("/:id", auth, checkOwnerOrAdmin(Post), upload.array("images", 2), validate(updatePostSchema), updatePost);

// Delete Post (Author or Admin)
router.delete("/:id", auth, checkOwnerOrAdmin(Post), deletePost);
// bookmark article
router.patch("/bookmark/:postId", auth, bookmarkArticle);

module.exports = router;
