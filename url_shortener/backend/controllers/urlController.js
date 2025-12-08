const Url = require("../models/Url");
const validator = require("validator");
const { nanoid } = require("nanoid");

function isValid(inputUrl) {
  return validator.isURL(inputUrl, {
    protocols: ["http", "https"],
    require_protocol: true,
    require_tld: true,
    allow_underscores: false,
  });
}

exports.shorten = async (req, res) => {
  try {
    const BASE_URL = process.env.BASE_URL;
    const { originalUrl } = req.body;

    if (!originalUrl) {
      return res.status(400).json({ error: "URL is required" });
    }

    let validatedUrl = originalUrl.trim();

    // Auto-add https:// if missing
    if (!/^https?:\/\//i.test(validatedUrl)) {
      validatedUrl = "https://" + validatedUrl;
    }

    if (!isValid(validatedUrl)) {
      return res.status(400).json({ message: "Invalid URL format." });
    }

    // Check for existing URL
    const existing = await Url.findOne({ originalUrl: validatedUrl });

    if (existing) {
      return res.status(200).json({
        originalUrl: existing.originalUrl,
        shortUrl: existing.shortUrl,
        shortCode: existing.shortCode,
        clicks: existing.clicks,
        createdAt: existing.createdAt,
        expiresAt: existing.expiresAt,
      });
    }

    // Generate unique shortCode
    let shortCode;
    do {
      shortCode = nanoid(6);
    } while (await Url.findOne({ shortCode }));

    const shortUrl = `${BASE_URL}/${shortCode}`;

    // Create new document
    const newUrl = new Url({
      originalUrl: validatedUrl,
      shortCode,
      shortUrl,
    });

    await newUrl.save();

    return res.status(201).json({
      originalUrl: newUrl.originalUrl,
      shortUrl: newUrl.shortUrl,
      shortCode: newUrl.shortCode,
      clicks: newUrl.clicks,
      createdAt: newUrl.createdAt,
      expiresAt: newUrl.expiresAt,
    });
  } catch (error) {
    console.error("Shorten Error:", error);
    res.status(500).json({ message: "Server error. Try again later" });
  }
};

exports.shortenId = async (req, res) => {
  try {
    const { id } = req.params;
    const urlDoc = await Url.findOne({ shortCode: id }).lean();

    if (!urlDoc) {
      return res.status(404).json({ error: "Short Url not found" });
    }

    await Url.updateOne({ _id: urlDoc._id }, { $inc: { clicks: 1 } });

    res.redirect(urlDoc.originalUrl);
  } catch (error) {
    res.status(500).json({ error: `Server error: ${error.message}` });
  }
};

exports.getUrls = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 100;
    const skip = (page - 1) * limit;

    const shortenedUrls = await Url.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json(shortenedUrls);
  } catch (error) {
    console.error("GetUrls Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getStats = async (req, res) => {
  try {
    const { id } = req.params;
    const urlDoc = await Url.findOne({ shortCode: id }).lean();
    if (!urlDoc) {
      return res.status(404).json({ error: "Short Url not found" });
    }
    res.status(200).json(urlDoc);
  } catch (error) {
    console.error("GetStats Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
