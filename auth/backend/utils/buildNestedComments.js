const Comment = require("../models/Comment");

async function buildNestedComments(rootComments) {
  const buildTree = async (comments) => {
    const result = [];

    for (const comment of comments) {
      const replies = await Comment.find({ parent: comment._id })
        .populate("author", "username")
        .sort({ createdAt: -1 });

      const nestedReplies = await buildTree(replies);

      result.push({
        ...comment._doc,
        replies: nestedReplies,
      });
    }

    return result;
  };

  return buildTree(rootComments);
}

module.exports = buildNestedComments;
