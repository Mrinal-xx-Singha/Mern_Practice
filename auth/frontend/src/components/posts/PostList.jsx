import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../redux/slices/postSlice";
import { Link, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

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
    if (error) {
      toast.error(`🚫 ${error}`);
    }
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
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-wide flex items-center gap-2 uppercase">
          Recent Posts
        </h1>
        <Link
          to="/create"
          className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition focus:ring-2 focus:ring-green-400"
        >
          ➕ Create
        </Link>
      </div>

      {/* Filters */}
      <div className="flex px-5 flex-col sm:flex-row flex-wrap gap-3 mb-8">
        <input
          type="text"
          placeholder="🔍 Filter by Tag"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          className="border px-3 py-2 rounded w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
        />
        <input
          type="text"
          placeholder="📂 Filter by Category"
          value={categoryInput}
          onChange={(e) => setCategoryInput(e.target.value)}
          className="border px-3 py-2 rounded w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
        />
        <button
          onClick={handleFilter}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition focus:ring-2 focus:ring-blue-400"
        >
          ✅ Apply Filters
        </button>
      </div>

      {/* Posts */}
      {loading ? (
        <p className="text-center text-gray-500 animate-pulse">⏳ Loading posts...</p>
      ) : posts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition transform hover:-translate-y-1 p-5 flex flex-col justify-between"
            >
              <div>
                <Link
                  to={`/posts/${post._id}`}
                  className="text-xl font-semibold text-blue-600 hover:underline"
                >
                  {post.title}
                </Link>
                <p className="text-xs text-gray-500 mt-1">
                  ✍️ by <span className="font-medium">{post.author.username}</span>
                </p>
                <p className="text-sm text-gray-700 mt-3 line-clamp-3">
                  {post.content}
                </p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-gray-600">
                <span className="bg-yellow-100 text-gray-800 px-2 py-1 rounded">
                  🏷️ {post.tags?.join(", ") || "No tags"}
                </span>
                <span className="text-gray-500">|</span>
                <span className="font-medium">📂 {post.category || "Uncategorized"}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-8">⚠️ No posts found.</p>
      )}

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-10">
        <button
          onClick={handlePrev}
          className="px-4 py-2 border rounded disabled:opacity-40 hover:bg-gray-50 transition"
          disabled={currentPage === 1}
        >
          ← Prev
        </button>
        <span className="px-4 py-2 font-medium text-gray-700 bg-gray-100 rounded">
          📄 Page {currentPage}
        </span>
        <button
          onClick={handleNext}
          className="px-4 py-2 border rounded hover:bg-gray-50 transition"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default PostList;
