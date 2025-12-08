const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    originalUrl: {
      type: String,
      required: true,
      index: true,
    },

    shortCode: {
      type: String,
      required: true,
      unique: true,
      minlength: 4,
      maxlength: 12,
    },

    shortUrl: {
      type: String,
      required: true,
    },

    clicks: {
      type: Number,
      default: 0,
    },

    createdAt: {
      type: Date,
      default: Date.now,
      immutable: true,
    },

    expiresAt: {
      type: Date,
      default: () => Date.now() + 3 * 24 * 60 * 60 * 1000, // Auto-expire in 3 days
    },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

// Explicit TTL index (production safe)
urlSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Optional: faster lookup for shortCode
urlSchema.index({ shortCode: 1 });

module.exports = mongoose.model("Url", urlSchema);
