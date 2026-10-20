const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { enhanceContent, matchResume } = require("../controllers/aiController");

// POST /api/ai/enhance  — grammar fix, title generation, summarise
router.post("/enhance", auth, enhanceContent);

// POST /api/ai/match-resume  — score resume PDF vs job description
router.post("/match-resume", auth, matchResume);

module.exports = router;
