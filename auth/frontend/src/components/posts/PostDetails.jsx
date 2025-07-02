import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

// 🧩 Recursive Comment Component
const CommonItem = ({ comment, onReply, onDelete, user }) => {
  const [likes, setLikes] = useState(comment?.likes?.length);
  const [liked, setLiked] = useState(comment?.likes?.includes(user?.id));

  const toggleLike = async () => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/comments/like/${comment._id}`
      );
      setLikes(res.data.likes);
      setLiked(res.data.liked);
    } catch (err) {
      console.error("Failed to toggle like");
    }
  };

  console.log(comment);
  const isAuthor = user?.id === comment.author?._id || user?.role === "admin";

  return (
    <div className="ml-4 mt-4 border-l pl-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">{comment.author?.username}</span>:{" "}
          {comment.content}
        </p>
        <div className="flex gap-2 items-center">
          <button
            onClick={toggleLike}
            className={`text-sm ${liked ? "text-red-600" : "text-gray-500"}`}
          >
            👍{likes}
          </button>
        </div>
        {isAuthor && (
          <button
            onClick={() => onDelete(comment._id)}
            className="text-red-500 text-sm"
          >
            Delete
          </button>
        )}
      </div>

      {user && (
        <button
          onClick={() => onReply(comment._id)}
          className="text-blue-500 text-sm mt-1"
        >
          Reply
        </button>
      )}

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

  // 🔄 Fetch post & comments
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
        setPost(null);
      }
    };
    fetchPostAndComments();
  }, [id]);

  const handleSubmitComment = async () => {
    try {
      await axios.post(`http://localhost:5000/api/comments/${id}`, {
        content: commentInput,
        parentId: replyTo,
      });
      setCommentInput("");
      setReplyTo(null);
      const updated = await axios.get(
        `http://localhost:5000/api/comments/post/${id}`
      );
      setComments(updated.data);
    } catch (error) {
      console.error("Failed to post comment", error);
    }
  };

  const handleReply = (parentId) => {
    setReplyTo(parentId);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`);
      navigate("/");
    } catch (error) {
      console.error("Delete failed");
    }
  };

  const handleCommentDelete = async (commentId) => {
    try {
      await axios.delete(`http://localhost:5000/api/comments/${commentId}`);
      const updated = await axios.get(
        `http://localhost:5000/api/comments/post/${id}`
      );
      setComments(updated.data);
    } catch (error) {
      console.error("Failed to delete comment", error);
    }
  };

  if (!post)
    return <div className="text-center py-8">Post not found or loading...</div>;

  const isAuthor = user && post.author._id === user._id;
  const PostCreatedAt = new Date(post.createdAt).toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2 text-center tracking-wide uppercase">
        {post.title}
      </h1>
      <p className="text-gray-500 mb-4 text-lg text-center">
        By {post.author.username} — {PostCreatedAt}
      </p>
      <div className="text-gray-800 mb-4 text-justify tracking-wide">
        {post.content}
      </div>

      <p className="text-sm text-gray-600 pt-4">
        <span className="bg-yellow-300 px-2 py-1 rounded">
          Tags: {post.tags.join(", ")}
        </span>{" "}
        | Category: <b>{post.category}</b>
      </p>

      {isAuthor && (
        <div className="flex gap-4 mt-4">
          <Link to={`/edit/${id}`} className="text-blue-600 hover:underline">
            Edit
          </Link>
          <button
            className="text-red-600 hover:underline"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      )}

      <hr className="my-6" />
      <h2 className="text-xl font-semibold mb-2">Comments</h2>

      {user ? (
        <div className="mb-4">
          <textarea
            className="w-full border rounded p-2 mb-2"
            rows="3"
            placeholder={
              replyTo ? "Replying to a comment..." : "Add a comment..."
            }
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
          />
          <div className="flex gap-2">
            <button
              onClick={handleSubmitComment}
              className="bg-blue-600 text-white px-4 py-1 rounded"
            >
              {replyTo ? "Reply" : "Comment"}
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
