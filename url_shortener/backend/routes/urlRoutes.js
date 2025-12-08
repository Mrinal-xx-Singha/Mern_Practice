const express = require("express");
const {
  shorten,
  shortenId,
  getUrls,
  getStats,
} = require("../controllers/urlController");

const router = express.Router();

// Create Short URL
router.post("/shorten", shorten);

// Get Stats (JSON)
router.get("/shortened/:id", getStats);

// Redirect to Original URL
router.get("/shorten/:id", shortenId);

// Get All URLs
router.get("/shortenedUrls", getUrls);
module.exports = router;
