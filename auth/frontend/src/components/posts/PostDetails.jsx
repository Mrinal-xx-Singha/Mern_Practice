import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { Trash2, Edit, Eye } from "lucide-react";
import MarkdownRenderer from "../MarkdownRenderer";
import MoreFromAuthor from "../MoreFromAuthor";
import CommonItem from "../CommonItem";

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
      await axios.delete(`http://localhost:5000/api/comments/${commentId}`, {
        withCredentials: true,
      });
      refreshComments();
      toast.success("🗑️ Comment deleted!");
    } catch (error) {
      console.error("Failed to delete comment", error);
      toast.error("🚫 Failed to delete comment.");
    }
  };
  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500 dark:text-gray-400 animate-pulse">
        <div className="w-24 h-24 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mb-4" />
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
    <div className="max-w-2xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-3 uppercase tracking-wide">
        {post.title}
      </h1>

      <p className="text-gray-500 text-center text-sm dark:text-gray-400">
        By <span className="font-semibold">{post.author.username}</span> on{" "}
        {postDate}
      </p>
      <p className="flex justify-center items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
        <Eye size={16} /> {post.views ?? 0} views
      </p>
      {/* Image  */}
      {post.images && post.images.length > 0 && (
        <div className="my-6 flex justify-center items-center max-w-lg">
          {post.images.map((url, i) => (
            <img
              key={i}
              src={url}
              alt={`Post Image ${i + 1}`}
              className="w-full h-auto object-cover rounded shadow-md dark:shadow-lg"
            />
          ))}
        </div>
      )}
      {/* Markdown  */}
      <div className="mt-2 prose dark:prose-invert max-w-none my-6">
        <MarkdownRenderer content={post.content} />
      </div>
      {/* Emoji */}
      <div className="flex justify-center gap-4 my-4 pt-3">
        {emojiOptions.map((emoji) => (
          <button
            onClick={() => handleReact(emoji)}
            key={emoji}
            className={`text-2xl transition-transform hover:scale-110 focus:outline-none  rounded ${
              userReaction === emoji ? "scale-125" : ""
            }`}
          >
            {emoji}
            <span className="text-sm">{reactionCounts[emoji] ?? 0}</span>
          </button>
        ))}
      </div>

      {/* Tags */}
      <p className="text-sm text-gray-700 dark:text-gray-300 mb-6">
        <span className="bg-yellow-100 dark:bg-yellow-800/20 text-yellow-800 dark:text-yellow-300 px-2 py-1 rounded">
          🏷️ {post.tags.join(", ")}
        </span>{" "}
        | <strong>📂</strong> {post.category}
      </p>

      {isAuthor && (
        <div className="flex gap-6 my-6 justify-center">
          <Link
            to={`/edit/${id}`}
            className="inline-flex items-center gap-1 text-blue-600 font-medium hover:underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300  transtion "
          >
            <Edit size={18} /> Edit
          </Link>
          <button
            onClick={handleDelete}
            className="inline-flex items-center gap-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 font-medium transition"
          >
            <Trash2 size={16} /> Delete
          </button>
        </div>
      )}

      <hr className="my-6" />
      <h2 className="text-xl font-semibold mb-4">💬 Comments</h2>

      {user ? (
        <div className="bg-gray-50 dark:bg-gray-800 rounded p-4 mb-6 shadow-sm">
          <textarea
            rows="3"
            placeholder={
              replyTo ? "↩️ Replying to comment..." : "Write a comment..."
            }
            className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
          />
          <div className="flex gap-3 mt-2">
            <button
              onClick={handleSubmitComment}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow transition-colors"
            >
              {replyTo ? "↩️ Reply" : "💬 Comment"}
            </button>
            {replyTo && (
              <button
                onClick={() => setReplyTo(null)}
                className="text-gray-600 dark:text-gray-400 underline hover:text-gray-800 dark:hover:text-gray-200"
              >
                Cancel Reply
              </button>
            )}
          </div>
        </div>
      ) : (
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-4">
          <Link
            to="/login"
            className="text-center text-sm text-gray-600 dark:text-gray-400 mb-4"
          >
            Login
          </Link>{" "}
          to comment.
        </p>
      )}

      {comments.length === 0 ? (
        <p className="text-gray-500">No comments yet.</p>
      ) : (
        comments.map((comment) => (
          <div
            key={comment._id}
            className="bg-white dark:bg-gray-900 rounded shadow p-3 mb-2 border border-gray-200 dark:border-gray-700"
          >
            <CommonItem
              key={comment._id}
              comment={comment}
              onReply={handleReply}
              onDelete={handleCommentDelete}
              user={user}
            />
          </div>
        ))
      )}
      <MoreFromAuthor authorId={post.author._id} currentPostId={post._id} />
    </div>
  );
};

export default PostDetails;
