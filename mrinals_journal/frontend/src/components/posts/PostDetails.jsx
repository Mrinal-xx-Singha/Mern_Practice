import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { Trash2, Edit, Eye, Bookmark } from "lucide-react";
import MarkdownRenderer from "../MarkdownRenderer";
import MoreFromAuthor from "../MoreFromAuthor";
import CommonItem from "../CommonItem";

import {
  getPostById,
  reactToPost,
  toggleBookmark,
} from "../../services/postService";
import { deletePost } from "../../redux/slices/postSlice";
import {
  getCommentsByPostId,
  addComment,
  deleteComment,
} from "../../services/commentService";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [commentInput, setCommentInput] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const emojiOptions = ["👍", "❤️", "😂", "😢"];
  const [reactionCounts, setReactionCounts] = useState({});
  const [userReaction, setUserReaction] = useState("");

  // Fetch post + comments
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postData, commentsData] = await Promise.all([
          getPostById(id),
          getCommentsByPostId(id),
        ]);
        setPost(postData);
        setComments(commentsData);
        setIsBookmarked(postData.bookmarks?.includes(user?._id));
      } catch (err) {
        console.error(err);
        toast.error("🚫 Failed to load post.");
        setPost(null);
      } finally {
        setCommentsLoading(false);
      }
    };
    fetchData();
  }, [id, user?._id]);

  // Handle reactions
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
  }, [post, user]);

  const handleReact = async (emoji) => {
    try {
      const updated = await reactToPost(post._id, emoji);
      setPost((prev) => ({ ...prev, reactions: updated.reactions }));
      toast.success(`Reacted with ${emoji}`);
    } catch (error) {
      console.error("Failed to react:", error);
      toast.error("🚫 Failed to react.");
    }
  };

  // Refresh comments
  const refreshComments = async () => {
    const updated = await getCommentsByPostId(id);
    setComments(updated);
  };

  const handleSubmitComment = async () => {
    if (!commentInput.trim()) return;
    try {
      await addComment(id, commentInput, replyTo);
      setCommentInput("");
      setReplyTo(null);
      refreshComments();
      toast.success("💬 Comment posted!");
    } catch (error) {
      console.error("Failed to post comment", error);
      toast.error("🚫 Failed to post comment.");
    }
  };

  const handleDelete = async () => {
    try {
      await dispatch(deletePost(id)).unwrap();
      toast.success("🗑️ Post deleted!");
      navigate("/");
    } catch (error) {
      console.error("Delete failed", error);
      toast.error("🚫 Failed to delete post.");
    }
  };

  const handleCommentDelete = async (commentId) => {
    try {
      await deleteComment(commentId);
      refreshComments();
      toast.success("🗑️ Comment deleted!");
    } catch (error) {
      console.error("Failed to delete comment", error);
      toast.error("🚫 Failed to delete comment.");
    }
  };

  if (!post) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[var(--color-text-muted)] border-t-[var(--color-text)] rounded-full animate-spin" />
          <p
            className="text-sm"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Loading Posts...
          </p>
        </div>
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

  const handleBookmark = async () => {
    if (!user) {
      toast.error("Please login to bookmark posts");
      return;
    }
    try {
      const data = await toggleBookmark(post._id);
      setIsBookmarked(data.isBookmarked);
      setPost((prev) => ({
        ...prev,
        bookmarks: data.isBookmarked
          ? [...(prev.bookmarks || []), user._id]
          : (prev.bookmarks || []).filter((id) => id !== user._id),
      }));
      toast.success(data.message);
    } catch {
      toast.error("Failed to update bookmark");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
      {/* Post Header */}
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-3 uppercase tracking-wide">
        {post.title}
      </h1>
      <div className="flex flex-col items-center justify-center gap-3">
        <p className="text-gray-500 text-center text-sm dark:text-gray-400 flex items-center gap-2">
          <img
            src={
              post.author?.avatar ||
              `https://ui-avatars.com/api/?name=${post.author?.username || "U"}&background=f0f0f0&color=242424&bold=true&size=128`
            }
            alt=""
            className="w-6 h-6 rounded-full object-cover"
            style={{ border: "1px solid var(--color-border)" }}
          />
          By <span className="font-semibold">{post.author.username}</span> on{" "}
          {postDate}
        </p>
      </div>
      <div className="flex justify-center items-center gap-2 mt-3">
        <p className="flex justify-center items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <Eye size={16} /> {post.views ?? 0} views
        </p>
        <button
          onClick={handleBookmark}
          className="flex justify-center items-center gap-2 text-xs text-gray-500 dark:text-gray-400 hover:text-green-600 cursor-pointer transition-colors"
        >
          <Bookmark
            size={16}
            fill={isBookmarked ? "currentColor" : "none"}
            className={isBookmarked ? "text-green-600" : ""}
          />{" "}
          {post.bookmarks?.length || 0} bookmarks
        </button>
      </div>

      {/* Images */}
      {post.images?.length > 0 && (
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

      {/* Content */}
      <div className="mt-2 prose dark:prose-invert max-w-none my-6">
        <MarkdownRenderer content={post.content} />
      </div>

      {/* Reactions */}
      <div className="flex justify-center gap-4 my-4 pt-3">
        {emojiOptions.map((emoji) => (
          <button
            key={emoji}
            onClick={() => handleReact(emoji)}
            aria-label={`React with ${emoji}`}
            className={`text-2xl transition-transform hover:scale-110 focus:outline-none rounded ${
              userReaction === emoji ? "scale-125" : ""
            }`}
          >
            {emoji}
            <span className="text-sm">{reactionCounts[emoji] ?? 0}</span>
          </button>
        ))}
      </div>

      {/* Tags & Category */}
      <p className="text-sm text-gray-700 dark:text-gray-300 mb-6">
        <span className="bg-yellow-100 dark:bg-yellow-800/20 text-yellow-800 dark:text-yellow-300 px-2 py-1 rounded">
          🏷️ {post.tags.join(", ")}
        </span>{" "}
        | <strong>📂</strong> {post.category}
      </p>

      {/* Author Actions */}
      {isAuthor && (
        <div className="flex gap-6 my-6 justify-center">
          <Link
            to={`/edit/${id}`}
            className="inline-flex items-center gap-1 text-blue-600 font-medium hover:underline"
          >
            <Edit size={18} /> Edit
          </Link>
          <button
            onClick={handleDelete}
            className="inline-flex items-center gap-1 text-red-600 hover:text-red-800 font-medium transition"
          >
            <Trash2 size={16} /> Delete
          </button>
        </div>
      )}

      <hr className="my-6" />

      {/* Comments */}
      <h2 className="text-xl font-semibold mb-4">💬 Comments</h2>

      {user ? (
        <div className="bg-gray-50 dark:bg-gray-800 rounded p-4 mb-6 shadow-sm">
          <textarea
            rows="3"
            placeholder={replyTo ? "↩️ Replying..." : "Write a comment..."}
            className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-400"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
          />
          <div className="flex gap-3 mt-2">
            <button
              onClick={handleSubmitComment}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
            >
              {replyTo ? "↩️ Reply" : "💬 Comment"}
            </button>
            {replyTo && (
              <button
                onClick={() => setReplyTo(null)}
                className="text-gray-600 underline"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      ) : (
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-4">
          <Link to="/login" className="underline">
            Login
          </Link>{" "}
          to comment.
        </p>
      )}

      {commentsLoading ? (
        <div className="text-gray-500 animate-pulse">Loading comments...</div>
      ) : comments.length === 0 ? (
        <p className="text-gray-500">No comments yet.</p>
      ) : (
        comments.map((comment) => (
          <div
            key={comment._id}
            className="bg-white dark:bg-gray-900 rounded shadow p-3 mb-2 border"
          >
            <CommonItem
              comment={comment}
              onReply={setReplyTo}
              onDelete={handleCommentDelete}
              user={user}
            />
          </div>
        ))
      )}

      {/* More from Author */}
      <MoreFromAuthor authorId={post.author._id} currentPostId={post._id} />
    </div>
  );
};

export default PostDetails;
