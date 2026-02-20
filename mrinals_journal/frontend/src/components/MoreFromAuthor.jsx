import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMoreFromAuthor } from "../redux/slices/postSlice";
import { Link } from "react-router-dom";

const MoreFromAuthor = ({ authorId, currentPostId }) => {
  const dispatch = useDispatch();
  const { moreFromAuthor, loading } = useSelector((state) => state.posts);

  useEffect(() => {
    if (authorId) {
      dispatch(fetchMoreFromAuthor({ authorId, exclude: currentPostId }));
    }
  }, [authorId, currentPostId]);

  if (loading || !moreFromAuthor?.length) return null;

  return (
    <div
      className="mt-12 pt-8"
      style={{ borderTop: "1px solid var(--color-border)" }}
    >
      <h3
        className="font-serif text-xl font-bold mb-6"
        style={{ color: "var(--color-text)" }}
      >
        More from this author
      </h3>
      <div className="space-y-6">
        {moreFromAuthor.map((post) => (
          <Link
            to={`/posts/${post._id}`}
            key={post._id}
            className="block group"
          >
            <div className="flex gap-4">
              <div className="flex-1 min-w-0">
                <h4
                  className="font-serif font-bold leading-snug mb-1 group-hover:underline decoration-1 underline-offset-2"
                  style={{ color: "var(--color-text)" }}
                >
                  {post.title}
                </h4>
                <p
                  className="text-sm"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
              {post.images?.[0] && (
                <img
                  src={post.images[0]}
                  alt=""
                  className="w-16 h-16 object-cover rounded flex-shrink-0"
                />
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MoreFromAuthor;
