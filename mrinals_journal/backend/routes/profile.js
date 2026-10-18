const express = require("express");
const auth = require("../middleware/auth");

const router = express.Router();
const { createUpload } = require("../utils/cloudinary");
const { getProfile, updateProfile } = require("../controllers/profileController");
const upload = createUpload("avatars", ["jpg", "jpeg", "png"]);

// GET user profile + posts
router.get("/profile", auth, getProfile);

// Update username + avatar
// ✅ Add `upload.single("avatar")` as middleware here:
router.put("/profile", auth, upload.single("avatar"), updateProfile);

module.exports = router;
