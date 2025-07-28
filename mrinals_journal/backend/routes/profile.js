const express = require("express");
const auth = require("../middleware/auth");
const User = require("../models/User");
const Post = require("../models/Post");
require("dotenv").config();
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "avatars",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});
const upload = multer({ storage });

// GET user profile + posts
router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password -__v")
      .lean(); //return plain js object

    if (!user) {
      return res.status(404).json({ error: "User not found " });
    }
    // Pagination for user posts
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const posts = await Post.find({ author: req.user.id })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .select("-__v")
      .lean();

    const totalPosts = await Post.countDocuments({ author: req.user.id });

    const bookMarkedPosts = await Post.find({
      _id: { $in: user.bookmarks || [] },
    })
      .select("title _id createdAt")
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      user,
      totalPosts,
      posts,
      currentPage: page,
      totalPage: Math.ceil(totalPosts / limit),
      bookmarks: bookMarkedPosts,
    });
  } catch (error) {
    console.error("Profile error:", error);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

// Update username + avatar
// ✅ Add `upload.single("avatar")` as middleware here:
router.put("/profile", auth, upload.single("avatar"), async (req, res) => {
  try {
    const { username, bio } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (username) user.username = username;
    if (bio) user.bio = bio;
    if (req.body.twitter) user.social.twitter = req.body.twitter;
    if (req.body.github) user.social.github = req.body.github;
    if (req.body.website) user.social.website = req.body.website;

    if (req.file && req.file.path) {
      user.avatar = req.file.path; // ✅ This is the Cloudinary image URL
    }

    await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        username: user.username,
        avatar: user.avatar,
        email: user.email,
        bio: user.bio,
      },
    });
  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({ error: "Failed to update profile" });
  }
});

module.exports = router;
