

const Post = require("../models/Post");
const User = require("../models/User");

exports.createPosts = async (req, res) => {
    try {
        const { title, content, tags, category } = req.body;
        const imageUrls = req.files?.map((file) => file.path) || []; //Cloudinary returns `file.path

        // Process tags into an array if passed as string 
        const processedTags = typeof tags === "string" ? tags.split(",").map((t) => t.trim()).filter(Boolean) : tags || []

        const newPost = new Post({
            title,
            content,
            tags: processedTags,
            category,
            images: imageUrls,
            author: req.user.id,
        });
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Failed to create post" });
    }
}

exports.getAllPosts = async (req, res) => {
    try {
        const { page = 1, limit = 9, tag, category } = req.query;
        const filter = {};
        if (tag) filter.tags = tag;
        if (category) filter.category = category;

        const posts = await Post.find(filter)
            .populate("author", "username avatar")
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));
        const totalPosts = await Post.countDocuments(filter);
        const totalPages = Math.ceil(totalPosts / limit);

        res.json({ posts, totalPages, currentPage: parseInt(page) });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch posts" });
    }
}
exports.updateEmoji = async (req, res) => {
    try {
        const { emoji } = req.body;
        const post = await Post.findById(req.params.postId);

        if (!post) return res.status(404).json({ error: "Post not found" });

        const existing = post.reactions.find(
            (r) => r.user.toString() === req.user.id,
        );
        if (existing) {
            existing.emoji = emoji; // update
        } else {
            post.reactions.push({ user: req.user.id, emoji });
        }

        await post.save();
        res.json({ message: "Reaction updated", reactions: post.reactions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update reaction" });
    }
}

exports.getAuthorPosts = async (req, res) => {
    const { authorId } = req.params;
    const { exclude } = req.query;

    try {
        const posts = await Post.find({
            author: authorId,
            _id: { $ne: exclude },
        })
            .limit(3)
            .sort({ createdAt: -1 })
            .select("title thumbnail createdAt images");

        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

exports.getbookmarkedPosts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 9;

        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ error: "User not found" });

        const totalBookmarks = user.bookmarks.length;

        // Sort bookmarks if we had a field, but since it's just an array of IDs,
        // we'll slice for pagination based on the order in the array (usually recent first if we used push/addToSet)
        const paginatedIds = user.bookmarks
            .slice()
            .reverse() // show latest first
            .slice((page - 1) * limit, page * limit);

        const bookmarkedPosts = await Post.find({ _id: { $in: paginatedIds } })
            .populate("author", "username")
            .sort({ createdAt: -1 });

        res.json({
            bookmarks: bookmarkedPosts,
            totalPage: Math.ceil(totalBookmarks / limit),
            currentPage: page,
        });
    } catch (error) {
        console.error("Fetch bookmarks error:", error);
        res.status(500).json({ error: "Failed to fetch bookmarks" });
    }
}

exports.getPost = async (req, res) => {
    try {
        const { id } = req.params;

        // Fetch updated post
        const post = await Post.findById(id).populate("author", "username avatar");

        if (!post) return res.status(404).json({ error: "Post not found" });

        res.json(post);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch post" });
    }
}

exports.updateView = async (req, res) => {
    try {
        const { id } = req.params
        await Post.findByIdAndUpdate(id, { $inc: { views: 1 } })

        return res.status(200).json({ success: true })
    } catch (err) {
        res.status(500).json({ error: "Failed to update views" })

    }

}

exports.updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, tags, category } = req.body

        let updateFields = { title, content, category }

        if (tags) {
            updateFields.tags = Array.isArray(tags) ? tags : tags.split(',').map((t) => t.trim())
        }

        // if user uploads new files, grab their cloudinary URLs 
        if (req.files && req.files.length > 0) {
            updateFields.images = req.files.map((file) => file.path)
        }
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { $set: updateFields },
            { new: true }
        )
        res.json(updatedPost);
    } catch (error) {
        console.error("PUT Error:", error);
        res.status(500).json({ error: `Backend crash: ${error.message}` });
    }
}

exports.deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedPost = await Post.findByIdAndDelete(id);
        if (!deletedPost) {
            return res.status(404).json({ error: "Post not found " });
        }
        res.json({ message: "Post deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete post" });
    }
}

exports.bookmarkArticle = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.user.id;

        const user = await User.findById(userId);
        const post = await Post.findById(postId);

        if (!user || !post) {
            return res.status(404).json({ error: "User or Post not found" });
        }

        const isBookmarked = user.bookmarks.includes(postId);

        if (isBookmarked) {
            // Unbookmark
            user.bookmarks.pull(postId);
            post.bookmarks.pull(userId);
        } else {
            // Bookmark
            user.bookmarks.addToSet(postId);
            post.bookmarks.addToSet(userId);
        }

        await Promise.all([user.save(), post.save()]);

        res.json({
            message: isBookmarked ? "Removed from bookmarks" : "Post bookmarked",
            isBookmarked: !isBookmarked,
            bookmarkCount: post.bookmarks.length,
        });
    } catch (error) {
        console.error("Bookmark error:", error);
        res.status(500).json({ error: "Failed to update bookmark" });
    }
}