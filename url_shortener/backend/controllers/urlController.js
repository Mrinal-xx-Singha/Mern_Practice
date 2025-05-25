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
  let BASE_URL = process.env.BASE_URL;

  try {
    const { originalUrl } = req.body;

    if (!originalUrl) {
      return res.status(400).json({ error: "URL is required" });
    }
    let validatedUrl = originalUrl.trim();

    if (!/^https?:\/\//i.test(validatedUrl)) {
      validatedUrl = "https://" + validatedUrl;
    }

    if (!isValid(validatedUrl)) {
      return res.status(400).json({ message: "Invalid URL format." });
    }
    //   Check for existing url
    const existing = await Url.findOne({ originalUrl: validatedUrl }).lean();

    if (existing) {
      return res.status(200).json({
        shortUrl: existing.shortUrl,
        originalUrl: existing.originalUrl,
      });
    }

    // Generate a unique short code
    let shortCode;
    do {
      shortCode = nanoid(6);
    } while (await Url.findOne({ shortCode }));

    //   Save to database

    const shortUrl = `${BASE_URL}/${shortCode}`;

    const newUrl = new Url({
      originalUrl: validatedUrl,
      shortCode,
      shortUrl,
      createdAt: new Date(),
    });

    await newUrl.save();

    return res.status(201).json({
      shortUrl: `${BASE_URL}/${shortCode}`,
      originalUrl: validatedUrl,
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
    const shortenedUrls = await Url.find().sort({ createdAt: -1 });
    res.status(200).json(shortenedUrls);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
