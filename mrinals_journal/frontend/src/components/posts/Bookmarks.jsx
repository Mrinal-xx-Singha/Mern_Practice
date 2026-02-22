import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../../config/api.js";

const API_BOOKMARKS_URL = `${API_BASE_URL}/api/posts/bookmarks`;

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BOOKMARKS_URL}?page=${page}`, {
          withCredentials: true,
        });
        setBookmarks(res.data.bookmarks || []);
        setTotalPage(res.data.totalPage);
      } catch (error) {
        console.error("Failed to fetch bookmarks", error);
        toast.error("Failed to load bookmarks");
      } finally {
        setLoading(false);
      }
    };
    fetchBookmarks();
  }, [page]);

  return (
    <div
      className="mx-auto pt-8 pb-16 px-6 min-h-screen"
      style={{ maxWidth: "var(--max-width-article)" }}
    >
      <h2
        className="font-serif text-3xl font-bold mb-10"
        style={{ color: "var(--color-text)" }}
      >
        Saved Stories
      </h2>

      {loading ? (
        <div className="space-y-8">
          {[1, 2, 3].map((n) => (
            <div key={n} className="animate-pulse">
              <div className="h-6 bg-gray-100 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-100 rounded w-1/4" />
            </div>
          ))}
        </div>
      ) : bookmarks.length === 0 ? (
        <div className="text-center py-20">
          <p
            className="text-lg font-serif"
            style={{ color: "var(--color-text-secondary)" }}
          >
            No stories saved yet.
          </p>
          <Link to="/" className="inline-block mt-4 btn-accent">
            Explore stories
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-0">
            {bookmarks.map((post, index) => (
              <article
                key={post._id}
                className="animate-fade-in"
                style={{
                  animationDelay: `${index * 0.05}s`,
                  borderBottom: "1px solid var(--color-border)",
                  padding: "2rem 0",
                }}
              >
                <Link to={`/posts/${post._id}`} className="block group">
                  <h3
                    className="font-serif tracking-tight text-xl font-bold leading-snug mb-1 group-hover:underline decoration-1 underline-offset-2"
                    style={{ color: "var(--color-text)" }}
                  >
                    {post.title}
                  </h3>
                  <div
                    className="flex items-center gap-2 text-sm"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    <span>{post.author?.username}</span>
                    <span>·</span>
                    <span>
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {/* Pagination */}
          {totalPage > 1 && (
            <div className="flex items-center justify-center gap-4 mt-12">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 text-sm font-medium rounded-full transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                style={{
                  border: "1px solid var(--color-border)",
                  color: "var(--color-text-secondary)",
                }}
              >
                ← Prev
              </button>
              <span
                className="text-sm font-medium"
                style={{ color: "var(--color-text-muted)" }}
              >
                {page} / {totalPage}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPage, p + 1))}
                disabled={page === totalPage}
                className="px-4 py-2 text-sm font-medium rounded-full transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                style={{
                  border: "1px solid var(--color-border)",
                  color: "var(--color-text-secondary)",
                }}
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Bookmarks;
