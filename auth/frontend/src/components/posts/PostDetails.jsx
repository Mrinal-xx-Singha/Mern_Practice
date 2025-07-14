import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { ThumbsUp, MessageCircle, Trash2, Edit, Eye } from "lucide-react";
import MarkdownRenderer from "../MarkdownRenderer";

// 🧩 Recursive Comment Component
const CommonItem = ({ comment, onReply, onDelete, user }) => {
  const [likes, setLikes] = useState(comment?.likes?.length || 0);
  const [liked, setLiked] = useState(comment?.likes?.includes(user?.id));

  const toggleLike = async () => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/comments/like/${comment._id}`
      );
      setLikes(res.data.likes);
      setLiked(res.data.liked);
      toast.success(res.data.liked ? "👍 Liked!" : "👍 Unliked!");
    } catch (err) {
      console.error("Failed to toggle like", err);
      toast.error("🚫 Failed to like comment.");
    }
  };

  const isAuthor = user?.id === comment.author?._id || user?.role === "admin";

  return (
    <div className="ml-6 mt-4 border-l-2 pl-4 border-gray-200">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-800">
            <span className="font-semibold">{comment.author?.username}</span>:{" "}
            {comment.content}
          </p>
          <div className="flex gap-4 mt-1 text-sm text-gray-600 items-center">
            <button
              onClick={toggleLike}
              className={`flex items-center gap-1 hover:text-red-600 transition ${
                liked ? "text-red-600" : ""
              }`}
            >
              <ThumbsUp size={16} /> {likes}
            </button>
            {user && (
              <button
                onClick={() => onReply(comment._id)}
                className="flex items-center gap-1 text-blue-600 hover:underline"
              >
                <MessageCircle size={16} /> Reply
              </button>
            )}
            {isAuthor && (
              <button
                onClick={() => onDelete(comment._id)}
                className="flex items-center gap-1 text-red-600 hover:underline"
              >
                <Trash2 size={16} /> Delete
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Recursively render replies */}
      {comment.replies?.length > 0 &&
        comment.replies.map((reply) => (
          <CommonItem
            key={reply._id}
            comment={reply}
            onReply={onReply}
            onDelete={onDelete}
            user={user}
          />
        ))}
    </div>
  );
};

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const emojiOptions = ["👍", "❤️", "😂", "😢"];
  const [reactionCounts, setReactionCounts] = useState({});
  const [userReaction, setUserReaction] = useState("");

  useEffect(() => {
    if (post && post.reactions) {
      const counts = { "👍": 0, "❤️": 0, "😂": 0, "😢": 0 };
      post.reactions.forEach((r) => {
        counts[r.emoji] = (counts[r.emoji] || 0) + 1;
        if (r.user === user?.id) {
          setUserReaction(r.emoji);
        }
      });
      setReactionCounts(counts);
    }
  }, [post]);

  const handleReact = async (emoji) => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/posts/react/${post._id}`,
        { emoji },
        { withCredentials: true }
      );
      const updatedPost = { ...post, reactions: res.data.reactions };
      setPost(updatedPost);
      toast.success(`Reacted with ${emoji}`);
    } catch (error) {
      console.error("Failed to react:", error);
      toast.error("🚫 Failed to react.");
    }
  };

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        const postRes = await axios.get(
          `http://localhost:5000/api/posts/${id}`
        );
        setPost(postRes.data);

        const commentsRes = await axios.get(
          `http://localhost:5000/api/comments/post/${id}`
        );
        setComments(commentsRes.data);
      } catch (err) {
        console.error(err);
        toast.error("🚫 Failed to load post.");
        setPost(null);
      }
    };
    fetchPostAndComments();
  }, [id]);

  const refreshComments = async () => {
    const updated = await axios.get(
      `http://localhost:5000/api/comments/post/${id}`
    );
    setComments(updated.data);
  };

  const handleSubmitComment = async () => {
    if (!commentInput.trim()) return;
    try {
      await axios.post(`http://localhost:5000/api/comments/${id}`, {
        content: commentInput,
        parentId: replyTo,
      });
      setCommentInput("");
      setReplyTo(null);
      refreshComments();
      toast.success("💬 Comment posted!");
    } catch (error) {
      console.error("Failed to post comment", error);
      toast.error("🚫 Failed to post comment.");
    }
  };

  const handleReply = (parentId) => setReplyTo(parentId);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`);
      toast.success("🗑️ Post deleted!");
      navigate("/");
    } catch (error) {
      console.error("Delete failed", error);
      toast.error("🚫 Failed to delete post.");
    }
  };

  const handleCommentDelete = async (commentId) => {
    try {
      await axios.delete(`http://localhost:5000/api/comments/${commentId}`);
      refreshComments();
      toast.success("🗑️ Comment deleted!");
    } catch (error) {
      console.error("Failed to delete comment", error);
      toast.error("🚫 Failed to delete comment.");
    }
  };

  if (!post) {
    return (
      <div className="text-center py-8 text-gray-500 animate-pulse">
        Loading post...
      </div>
    );
  }

  const isAuthor = user && post.author._id === user._id;
  const postDate = new Date(post.createdAt).toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-2 uppercase tracking-wide">
        {post.title}
      </h1>
      <p className="text-gray-500 text-center text-sm mb-4">
        By <span className="font-medium">{post.author.username}</span> on{" "}
        {postDate}
      </p>
      <p className="flex items-center gap-2 text-sm text-gray-500 mb-2">
        <Eye size={16} /> Views: {post.views || 0}
      </p>
      <div className="mt-2 w-full">
        <MarkdownRenderer content={post.content} />
      </div>

      <div className="flex gap-3 mb-4 pt-3">
        {emojiOptions.map((emoji) => (
          <button
            onClick={() => handleReact(emoji)}
            key={emoji}
            className={`text-2xl transition-transform hover:scale-110 ${
              userReaction === emoji ? "scale-125" : ""
            }`}
          >
            {emoji} {reactionCounts[emoji] || 0}
          </button>
        ))}
      </div>

      <p className="text-sm text-gray-600 mb-6">
        <span className="bg-yellow-200 px-2 py-1 rounded">
          🏷️ Tags: {post.tags.join(", ")}
        </span>{" "}
        | <strong>📂 Category:</strong> {post.category}
      </p>

      {isAuthor && (
        <div className="flex gap-4 mb-6">
          <Link
            to={`/edit/${id}`}
            className="flex items-center gap-1 text-blue-600 font-medium hover:underline"
          >
            <Edit size={16} /> Edit
          </Link>
          <button
            onClick={handleDelete}
            className="flex items-center gap-1 text-red-600 font-medium hover:underline"
          >
            <Trash2 size={16} /> Delete
          </button>
        </div>
      )}

      <hr className="my-6" />
      <h2 className="text-xl font-semibold mb-4">💬 Comments</h2>

      {user ? (
        <div className="mb-6">
          <textarea
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-200"
            rows="3"
            placeholder={
              replyTo ? "↩️ Replying to a comment..." : "Write a comment..."
            }
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
          />
          <div className="flex gap-3 mt-2">
            <button
              onClick={handleSubmitComment}
              className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
            >
              {replyTo ? "↩️ Reply" : "💬 Comment"}
            </button>
            {replyTo && (
              <button
                onClick={() => setReplyTo(null)}
                className="text-gray-600 underline"
              >
                Cancel Reply
              </button>
            )}
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-500 mb-4">
          <Link to="/login" className="text-blue-600 underline">
            Login
          </Link>{" "}
          to comment.
        </p>
      )}

      {comments.length === 0 ? (
        <p className="text-gray-500">No comments yet.</p>
      ) : (
        comments.map((comment) => (
          <CommonItem
            key={comment._id}
            comment={comment}
            onReply={handleReply}
            onDelete={handleCommentDelete}
            user={user}
          />
        ))
      )}
    </div>
  );
};

export default PostDetails;
