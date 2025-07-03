import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../redux/slices/postSlice";
import { logoutUser } from "../../redux/slices/authSlice";
import { Link, useSearchParams } from "react-router-dom";

const PostList = () => {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.posts);
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

  const handleFilter = () => {
    const params = {};
    if (tagInput) params.tag = tagInput;
    if (categoryInput) params.category = categoryInput;
    params.page = 1;
    setSearchParams(params);
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
    <div className="max-w-5xl mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold uppercase tracking-wide text-gray-800">
          Recent Posts
        </h1>
        <div className="flex gap-4">
          <Link
            to="/create"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            + Create
          </Link>
          <button
            onClick={() => dispatch(logoutUser())}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-3 items-center">
        <input
          type="text"
          placeholder="Filter by Tag"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          className="border px-3 py-2 rounded w-full sm:w-auto focus:outline-none focus:ring focus:ring-blue-300"
        />
        <input
          type="text"
          placeholder="Filter by Category"
          value={categoryInput}
          onChange={(e) => setCategoryInput(e.target.value)}
          className="border px-3 py-2 rounded w-full sm:w-auto focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          onClick={handleFilter}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Apply Filters
        </button>
      </div>

      {/* Posts */}
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : posts.length > 0 ? (
        posts.map((post) => (
          <div
            key={post._id}
            className="bg-white shadow-md hover:shadow-lg transition p-6 mb-5 rounded-lg"
          >
            <Link
              to={`/posts/${post._id}`}
              className="text-2xl text-blue-600 font-semibold hover:underline"
            >
              {post.title}
            </Link>
            <p className="text-sm text-gray-600 mt-1">
              by <span className="font-medium">{post.author.username}</span>
            </p>
            <div className="text-gray-800 mt-3 text-sm leading-relaxed">
              {post.content.slice(0, 150)}...
            </div>
            <div className="mt-4 text-xs text-gray-600 flex flex-wrap items-center gap-2">
              <span className="bg-yellow-200 px-2 py-1 rounded text-gray-800">
                Tags: {post.tags?.join(", ") || "None"}
              </span>
              <span className="text-gray-500">|</span>
              <span className="font-medium">Category:</span> {post.category}
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 mt-8">No posts found.</p>
      )}

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={handlePrev}
          className="px-4 py-2 border rounded disabled:opacity-40"
          disabled={currentPage === 1}
        >
          ← Prev
        </button>
        <span className="px-4 py-2 font-medium text-gray-700 bg-gray-100 rounded">
          Page {currentPage}
        </span>
        <button
          onClick={handleNext}
          className="px-4 py-2 border rounded"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default PostList;
