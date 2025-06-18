const Post = require("../models/Post");
const User = require("../models/User");

module.exports = async function (req, res, next) {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    if (post.author.toString() !== req.params.id) {
      const user = await User.findById(req.params.id);

      if (user.role !== "admin") {
        return res.status(403).json({ error: "Unauthorized" });
      }
    }
    next();
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
