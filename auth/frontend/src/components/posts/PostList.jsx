import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../redux/slices/postSlice";
import { Link, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Plus, Funnel, UserRoundPen, Tags, Folder } from "lucide-react";

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

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 tracking-tight">
          Recent Posts
        </h1>
        <Link
          to="/create"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:ring-2 focus:ring-green-400 transition"
        >
          <Plus size={18} /> Create
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center mb-8">
        <input
          type="text"
          placeholder="🔍 Filter by Tag"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          className="border px-4 py-2 rounded w-full sm:w-64 shadow-sm focus:ring-2 focus:ring-blue-300 outline-none"
        />
        <input
          type="text"
          placeholder="📂 Filter by Category"
          value={categoryInput}
          onChange={(e) => setCategoryInput(e.target.value)}
          className="border px-4 py-2 rounded w-full sm:w-64 shadow-sm focus:ring-2 focus:ring-blue-300 outline-none"
        />
        <button
          onClick={handleFilter}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition focus:ring-2 focus:ring-blue-400 flex items-center gap-1"
        >
          <Funnel size={16} />
          Apply
        </button>
      </div>

      {/* Posts Grid */}
      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="animate-pulse bg-white border rounded p-5 h-40"
            />
          ))}
        </div>
      ) : posts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-lg border shadow-sm   p-5 flex flex-col justify-between"
            >
              <div>
                <Link
                  to={`/posts/${post._id}`}
                  className="text-lg font-semibold text-blue-600 hover:underline"
                >
                  {post.title}
                </Link>
                <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                  <UserRoundPen size={14} />
                  by <span className="font-medium">{post.author.username}</span>
                </p>
                <p className="text-sm text-gray-700 mt-3 line-clamp-3">
                  {post.content}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                {post.tags?.length ? (
                  <span className="flex items-center gap-1 bg-blue-50 text-blue-800 px-2 py-1 rounded-full">
                    <Tags size={14} />
                    {post.tags.join(", ")}
                  </span>
                ) : (
                  <span className="text-gray-400 italic">No tags</span>
                )}
                <span className="flex items-center gap-1 bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                  <Folder size={14} />
                  {post.category || "Uncategorized"}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-8">⚠️ No posts found.</p>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-10">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100 disabled:opacity-40 transition"
        >
          ← Prev
        </button>
        <span className="px-4 py-2 font-medium text-gray-700 bg-gray-100 rounded">
          Page {currentPage}
        </span>
        <button
          onClick={handleNext}
          className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100 transition"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default PostList;
