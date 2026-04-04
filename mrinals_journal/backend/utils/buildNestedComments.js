const Comment = require("../models/Comment");

async function buildNestedComments(rootComments) {
  if (!rootComments || rootComments.length === 0) return [];

  // Extract all post IDs from root comments to fetch all related comments in one query
  const postIds = [
    ...new Set(
      rootComments.map((c) => c.post?.toString()).filter(Boolean)
    ),
  ];

  // Fetch all comments for these posts to build the tree in memory
  const allComments = await Comment.find({ post: { $in: postIds } })
    .populate("author", "username")
    .sort({ createdAt: -1 });

  // Map comments by their parent ID for quick lookup
  const commentMap = {};
  for (const comment of allComments) {
    const parentId = comment.parent ? comment.parent.toString() : "root";
    if (!commentMap[parentId]) {
      commentMap[parentId] = [];
    }
    commentMap[parentId].push(comment);
  }

  // Recursive function to build the tree from the map
  const buildTree = (comments) => {
    return comments.map((comment) => {
      const replies = commentMap[comment._id.toString()] || [];
      return {
        ...(comment._doc || comment),
        replies: buildTree(replies),
      };
    });
  };

  return buildTree(rootComments);
}

module.exports = buildNestedComments;
