import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { ThumbsUp, MessageCircle, Trash2 } from "lucide-react";
import { API_BASE_URL } from "../config/api.js";

const CommonItem = ({ comment, onReply, onDelete, user }) => {
  const [likes, setLikes] = useState(comment?.likes?.length || 0);
  const [liked, setLiked] = useState(comment?.likes?.includes(user?._id));

  const toggleLike = async () => {
    try {
      const res = await axios.patch(
        `${API_BASE_URL}/api/comments/like/${comment._id}`,
        {},
        { withCredentials: true },
      );
      setLikes(res.data.likes);
      setLiked(res.data.liked);
    } catch (err) {
      console.error("Failed to toggle like", err);
      toast.error("Failed to like comment");
    }
  };

  const isAuthor = user?._id === comment.author?._id || user?.role === "admin";

  return (
    <div
      className="py-4"
      style={{ borderBottom: "1px solid var(--color-border)" }}
    >
      {/* Comment header */}
      <div className="flex items-center gap-2 mb-2">
        <img
          src={
            comment.author?.avatar ||
            `https://ui-avatars.com/api/?name=${comment.author?.username || "U"}&background=f0f0f0&color=242424&size=64`
          }
          alt=""
          className="w-6 h-6 rounded-full object-cover"
        />
        <span
          className="text-sm font-medium"
          style={{ color: "var(--color-text)" }}
        >
          {comment.author?.username}
        </span>
      </div>

      {/* Comment content */}
      <p
        className="text-sm leading-relaxed mb-2 pl-8"
        style={{ color: "var(--color-text)" }}
      >
        {comment.content}
      </p>

      {/* Actions */}
      <div className="flex items-center gap-4 pl-8">
        <button
          onClick={toggleLike}
          className="flex items-center gap-1 text-xs transition-colors cursor-pointer"
          style={{
            color: liked ? "var(--color-danger)" : "var(--color-text-muted)",
          }}
        >
          <ThumbsUp size={14} />
          <span>{likes}</span>
        </button>

        {user && (
          <button
            onClick={() => onReply(comment._id)}
            className="flex items-center gap-1 text-xs transition-colors cursor-pointer"
            style={{ color: "var(--color-text-muted)" }}
          >
            <MessageCircle size={14} />
            Reply
          </button>
        )}

        {isAuthor && (
          <button
            onClick={() => onDelete(comment._id)}
            className="flex items-center gap-1 text-xs transition-colors cursor-pointer"
            style={{ color: "var(--color-danger)" }}
          >
            <Trash2 size={14} />
          </button>
        )}
      </div>

      {/* Nested replies */}
      {comment.replies?.length > 0 && (
        <div
          className="ml-8 mt-2"
          style={{ borderLeft: "2px solid var(--color-border)" }}
        >
          <div className="pl-4">
            {comment.replies.map((reply) => (
              <CommonItem
                key={reply._id}
                comment={reply}
                onReply={onReply}
                onDelete={onDelete}
                user={user}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommonItem;
