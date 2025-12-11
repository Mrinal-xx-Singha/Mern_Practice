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
router.get("/stats/:id", getStats);

// Get All URLs
router.get("/urls", getUrls);
module.exports = router;
