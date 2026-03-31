import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../redux/slices/postSlice";
import { Link, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { PenLine, Search, X } from "lucide-react";

const PostList = () => {
  const dispatch = useDispatch();
  const { posts, loading, error, totalPages } = useSelector(
    (state) => state.posts,
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);

  const currentPage = parseInt(searchParams.get("page")) || 1;
  const currentTag = searchParams.get("tag") || "";
  const currentCategory = searchParams.get("category") || "";

  const [tagInput, setTagInput] = useState(currentTag);
  const [categoryInput, setCategoryInput] = useState(currentCategory);

  useEffect(() => {
    const query = `?page=${currentPage}&tag=${currentTag}&category=${currentCategory}`;
    dispatch(fetchPosts(query));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [dispatch, currentPage, currentTag, currentCategory]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const handleFilter = () => {
    const params = { page: 1 };
    if (tagInput) params.tag = tagInput;
    if (categoryInput) params.category = categoryInput;
    setSearchParams(params);
  };

  const handleClearFilters = () => {
    setTagInput("");
    setCategoryInput("");
    setSearchParams({ page: 1 });
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setSearchParams({
        page: currentPage - 1,
        tag: currentTag,
        category: currentCategory,
      });
    }
  };

  const handleNext = () => {
    setSearchParams({
      page: currentPage + 1,
      tag: currentTag,
      category: currentCategory,
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleFilter();
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getReadTime = (content) => {
    const words = content?.split(/\s+/).length || 0;
    return Math.max(1, Math.ceil(words / 200));
  };
  return (
    <div
      className="mx-auto pt-8 pb-16 px-6 min-h-screen"
      style={{ maxWidth: "var(--max-width-article)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <h1
          className="font-serif text-3xl font-bold"
          style={{ color: "var(--color-text)" }}
        >
          Feed
        </h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="p-2 rounded-full transition-colors cursor-pointer"
            style={{
              color: "var(--color-text-secondary)",
              backgroundColor: filtersOpen
                ? "var(--color-bg-subtle)"
                : "transparent",
            }}
          >
            <Search size={18} />
          </button>
          <Link
            to="/create"
            className="inline-flex items-center gap-1.5 btn-accent"
          >
            <PenLine size={16} />
            Write
          </Link>
        </div>
      </div>

      {/* Filters - collapsible */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          filtersOpen ? "max-h-[200px] mb-8" : "max-h-0"
        }`}
      >
        <div
          className="flex flex-col sm:flex-row gap-3 p-4 rounded-lg"
          style={{ backgroundColor: "var(--color-bg-subtle)" }}
        >
          <input
            type="text"
            placeholder="Filter by tag..."
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="input-clean px-3 py-2 rounded-lg text-sm flex-1"
            style={{
              borderBottom: "none",
              border: "1px solid var(--color-border)",
              backgroundColor: "var(--color-bg)",
            }}
          />
          <input
            type="text"
            placeholder="Filter by category..."
            value={categoryInput}
            onChange={(e) => setCategoryInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="input-clean px-3 py-2 rounded-lg text-sm flex-1"
            style={{
              borderBottom: "none",
              border: "1px solid var(--color-border)",
              backgroundColor: "var(--color-bg)",
            }}
          />
          <div className="flex gap-2">
            <button onClick={handleFilter} className="btn-accent text-xs px-4">
              Apply
            </button>
            <button
              onClick={handleClearFilters}
              className="text-xs px-3 py-1.5 rounded-full cursor-pointer transition-colors"
              style={{
                color: "var(--color-text-secondary)",
                border: "1px solid var(--color-border)",
              }}
            >
              <X size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Posts */}
      {loading ? (
        <div className="space-y-8">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="animate-pulse">
              <div className="h-4 bg-gray-100 rounded w-1/4 mb-3" />
              <div className="h-5 bg-gray-100 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-100 rounded w-full mb-2" />
              <div className="h-4 bg-gray-100 rounded w-2/3" />
            </div>
          ))}
        </div>
      ) : posts.length > 0 ? (
        <div className="space-y-0">
          {posts.map((post, index) => (
            <article
              key={post._id}
              className="animate-fade-in"
              style={{
                animationDelay: `${index * 0.05}s`,
                borderBottom: "1px solid var(--color-border)",
                padding: "2rem 0",
              }}
            >
              <div className="flex gap-5">
                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* Author + date */}
                  <div className="flex items-center gap-2 mb-2">
                    <img
                      src={
                        post.author?.avatar ||
                        `https://ui-avatars.com/api/?name=${post.author?.username || "U"}&background=f0f0f0&color=242424&size=64`
                      }
                      alt=""
                      className="w-5 h-5 rounded-full object-cover"
                    />
                    <span
                      className="text-sm font-medium"
                      style={{ color: "var(--color-text)" }}
                    >
                      {post.author?.username}
                    </span>
                    <span style={{ color: "var(--color-text-muted)" }}>·</span>
                    <span
                      className="text-sm"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {formatDate(post.createdAt)}
                    </span>
                  </div>

                  {/* Title */}
                  <Link to={`/posts/${post._id}`} className="block group">
                    <h2
                      className="font-serif text-xl font-bold leading-snug mb-1 group-hover:underline decoration-1 underline-offset-2"
                      style={{ color: "var(--color-text)" }}
                    >
                      {post.title}
                    </h2>
                    <p
                      className="text-[0.935rem] leading-relaxed line-clamp-2"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {post.content}
                    </p>
                  </Link>

                  {/* Meta */}
                  <div className="flex items-center gap-3 mt-3 flex-wrap">
                    {post.category && (
                      <span
                        className="text-xs px-2.5 py-1 rounded-full"
                        style={{
                          backgroundColor: "var(--color-bg-subtle)",
                          color: "var(--color-text-secondary)",
                        }}
                      >
                        {post.category}
                      </span>
                    )}
                    <span
                      className="text-xs"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {getReadTime(post.content)} min read
                    </span>
                  </div>
                </div>

                {/* Thumbnail (right side, Medium-style) */}
                {post.images?.length > 0 && (
                  <Link to={`/posts/${post._id}`} className="flex-shrink-0">
                    <img
                      src={post.images[0]}
                      alt=""
                      className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded"
                    />
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p
            className="text-lg font-serif"
            style={{ color: "var(--color-text-secondary)" }}
          >
            No stories yet.
          </p>
          <Link to="/create" className="inline-block mt-4 btn-accent">
            Write the first one
          </Link>
        </div>
      )}

      {/* Pagination */}
      {posts.length > 0 && (
        <div className="flex items-center justify-center gap-4 mt-12">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm font-medium rounded-full transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            style={{
              border: "1px solid var(--color-border)",
              color: "var(--color-text-secondary)",
            }}
          >
            ← Previous
          </button>
          <span
            className="text-sm font-medium"
            style={{ color: "var(--color-text-muted)" }}
          >
            {currentPage}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={handleNext}
            className="px-4 py-2 text-sm font-medium rounded-full transition-all cursor-pointer"
            style={{
              border: "1px solid var(--color-border)",
              color: "var(--color-text-secondary)",
            }}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default PostList;
