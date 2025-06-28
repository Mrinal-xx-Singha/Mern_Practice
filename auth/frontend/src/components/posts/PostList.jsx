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
    <div className="max-w-5xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6 uppercase tracking-widest">
        Recent Posts
      </h1>
      <div className="flex justify-between items-center mb-4">
        <Link
          to="/create"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Create +
        </Link>
        <button
          onClick={() => dispatch(logoutUser())}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-4 flex-wrap">
        <input
          type="text"
          placeholder="Filter by Tag"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          className="border px-2 py-1 rounded"
        />
        <input
          type="text"
          placeholder="Filter by Category"
          value={categoryInput}
          onChange={(e) => setCategoryInput(e.target.value)}
          className="border px-2 py-1 rounded"
        />
        <button
          onClick={handleFilter}
          className="bg-blue-600 text-white px-4 py-1 rounded"
        >
          Apply
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : posts.length > 0 ? (
        posts.map((post) => (
          <div key={post._id} className="bg-white shadow p-4 mb-4 rounded">
            <Link
              to={`/posts/${post._id}`}
              className="text-xl text-blue-500 font-semibold hover:underline"
            >
              {post.title}
            </Link>
            <p className="text-sm text-gray-600 mt-1">
              by {post.author.username}
            </p>
            <div className="text-sm text-gray-700 mt-2">
              {post.content.slice(0, 120)}...
            </div>
            <div className="mt-2 text-xs text-gray-500">
              Tags:{" "}
              <span className="bg-yellow-300 px-2 py-1 text-gray-800 rounded">
                {post.tags?.join(", ")}
              </span>{" "}
              | Category: {post.category}
            </div>
          </div>
        ))
      ) : (
        <p>No posts found.</p>
      )}

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={handlePrev}
          className="px-3 py-1 border rounded disabled:opacity-50"
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <button
          onClick={handleNext}
          className="px-3 py-1 border rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PostList;
