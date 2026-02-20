const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function createUpload(
  folder,
  allowed_formats = ["jpg", "png", "jpeg", "webp"],
) {
  const storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder,
      allowed_formats,
    },
  });
  return multer({ storage });
}

// Default upload for blog posts
const upload = createUpload("blog_posts");

module.exports = upload;
module.exports.createUpload = createUpload;
