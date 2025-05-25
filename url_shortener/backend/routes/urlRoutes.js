const express = require("express");
const { shorten, shortenId,getUrls } = require("../controllers/urlController");

const router = express.Router();

router.post("/shorten", shorten);
router.get("/shorten/:id", shortenId);
router.get("/shortenedUrls",getUrls)
module.exports = router;
