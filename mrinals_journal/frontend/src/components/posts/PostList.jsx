import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../redux/slices/postSlice";
import { Link, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Plus, Funnel, UserRoundPen, Tags, Folder, X } from "lucide-react";

const PostList = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.posts);
  const [searchParams, setSearchParams] = useSearchParams();

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
    if (error) toast.error(`🚫 ${error}`);
  }, [error]);

  const handleFilter = () => {
    const params = {};
    if (tagInput) params.tag = tagInput;
    if (categoryInput) params.category = categoryInput;
    params.page = 1;
    setSearchParams(params);
    toast.success("✅ Filters applied!");
  };

  const handleClearFilters = () => {
    setTagInput("");
    setCategoryInput("");
    setSearchParams({ page: 1 });
    toast("🔄 Filters cleared");
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

  return (
    <div className="max-w-6xl mx-auto pt-24 pb-10 py-10 px-4 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 tracking-tight">
          Recent Posts
        </h1>
        <Link
          to="/create"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 transition"
        >
          <Plus size={18} /> Create
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-gray-50 p-4 rounded-md shadow-sm mb-8 flex flex-col sm:flex-row gap-3 items-center">
        <input
          type="text"
          placeholder="🔍 Filter by Tag"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="border px-4 py-2 rounded w-full sm:w-64 shadow-sm focus:ring-2 focus:ring-blue-300 outline-none"
        />
        <input
          type="text"
          placeholder="📂 Filter by Category"
          value={categoryInput}
          onChange={(e) => setCategoryInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="border px-4 py-2 rounded w-full sm:w-64 shadow-sm focus:ring-2 focus:ring-blue-300 outline-none"
        />
        <div className="flex gap-2">
          <button
            onClick={handleFilter}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition focus:ring-2 focus:ring-blue-400 flex items-center gap-1"
          >
            <Funnel size={16} />
            Apply
          </button>
          <button
            onClick={handleClearFilters}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition flex items-center gap-1"
          >
            <X size={16} />
            Clear
          </button>
        </div>
      </div>

      {/* Posts Grid */}
      {loading ? (
        <div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          aria-busy="true"
        >
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="animate-pulse bg-white border rounded p-5 h-48"
            />
          ))}
        </div>
      ) : posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white dark:bg-gray-900 rounded-lg border dark:border-gray-800 shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1 p-5 flex flex-col justify-between h-full"
            >
              <div>
                {/* Thumbnail */}
                <img
                  src={
                    post.images.length > 0
                      ? post.images[0]
                      : "https://placehold.co/600x400/EEE/31343C?font=poppins&text=BlogPost"
                  }
                  alt={post.title}
                  className="w-full object-contain md:object-cover mb-3 h-48 rounded"
                />

                {/* Divider */}
                <div className="border-t-2 mb-2 border-gray-300 dark:border-gray-700" />

                {/* Title */}
                <Link
                  to={`/posts/${post._id}`}
                  className="text-lg font-semibold text-blue-700 dark:text-blue-400 hover:underline"
                >
                  {post.title}
                </Link>

                {/* Author */}
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
                  <UserRoundPen size={14} />
                  by <span className="font-medium">{post.author.username}</span>
                </p>

                {/* Excerpt */}
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-3 line-clamp-3">
                  {post.content}
                </p>
              </div>

              {/* Tags & Category */}
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                {post.tags?.length ? (
                  <span className="flex items-center gap-1 bg-blue-50 dark:bg-blue-950 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
                    <Tags size={14} />
                    {post.tags.join(", ")}
                  </span>
                ) : (
                  <span className="text-gray-400 italic">No tags</span>
                )}
                <span className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 px-2 py-1 rounded-full">
                  <Folder size={14} />
                  {post.category || "Uncategorized"}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-8">
          ⚠️ No posts found. Try different filters or create a post!
        </p>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-10">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded transition ${
            currentPage === 1
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          ← Prev
        </button>
        <span className="px-4 py-2 font-medium text-gray-700 bg-gray-100 rounded">
          Page {currentPage}
        </span>
        <button
          onClick={handleNext}
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default PostList;
