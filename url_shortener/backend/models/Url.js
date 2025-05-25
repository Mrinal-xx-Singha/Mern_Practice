const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortCode: { type: String, required: true, unique: true },
   shortUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  clicks: { type: Number, default: 0 },
  expiresAt: { type: Date, default: () => Date.now() + 3 * 24 * 60 * 60 * 1000, expires: '3d' },
},{
  versionKey:false
});

module.exports = mongoose.model("Url", urlSchema);
