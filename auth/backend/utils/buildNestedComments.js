const Comment = require("../models/Comment");

async function buildNestedComments(comments) {
  const commentMap = {};
  const queue = [...comments];

  // Create a map
  comments.forEach(
    (c) => (commentMap[c._id.toString()] = { ...c._doc, replies: [] })
  );

  // Fetch all replies
  const replies = await Comment.find({
    parent: { $in: comments.map((c) => c._id) },
  })
    .populate("author", "username")
    .sort({ createdAt: -1 });

  // Add replies to parent
  for (const reply of replies) {
    const parentId = reply.parent?.toString();
    if (parentId && commentMap[parentId]) {
      commentMap[parentId].replies.push(reply);
    }
  }

  // Optionally recurse again for deeper levels
  if (replies.length > 0) {
    const nestedReplies = await buildNestedComments(replies);
    for (const reply of nestedReplies) {
      const parentId = reply.parent?.toString();
      if (parentId && commentMap[parentId]) {
        commentMap[parentId].replies.push(reply);
      }
    }
  }

  return Object.values(commentMap);
}

module.exports = buildNestedComments;
