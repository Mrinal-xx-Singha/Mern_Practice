// CommonItem.jsx
import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { ThumbsUp, MessageCircle, Trash2 } from "lucide-react";

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

  const isAuthor = user._id === comment.author._id || user?.role === "admin";

  return (
    <div className="ml-6 mt-4 border-l-2 pl-4 border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-800 dark:text-gray-100">
            <span className="font-semibold">{comment.author?.username}</span>:{" "}
            {comment.content}
          </p>
          <div className="flex gap-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
            <button
              onClick={toggleLike}
              className={`flex items-center gap-1 hover:text-red-600 dark:hover:text-red-400 ${
                liked ? "text-red-600 dark:text-red-400" : ""
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

export default CommonItem;
