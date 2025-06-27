import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, deletePost } from "../../redux/slices/postSlice";
import { logoutUser } from "../../redux/slices/authSlice";
import { Link } from "react-router-dom";
const PostList = () => {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.posts);
  console.log(posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6 uppercase tracking-widest">
        Recent Posts
      </h1>
      <div className=" flex justify-between items-center m-2">
        <button className=" px-4 py-2 bg-green-600 text-white rounded  hover:bg-green-700">
          <Link to="/create">Create +</Link>
        </button>
        <button
          onClick={() => dispatch(logoutUser())}
          className="px-4 py-2 bg-red-600 text-white rounded  hover:bg-red-700"
        >
          Logout
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} className="bg-white shadow p-4 mb-4 rounded">
            <Link
              to={`/posts/${post._id}`}
              className="text-xl text-blue-400 font-semibold hover:underline"
            >
              {post.title}
            </Link>
            <p className="text-sm text-gray-600 mt-1">
              by {post.author.username}
            </p>
            <div className="text-sm text-gray-700 mt-2">
              {post.content.slice(0, 120)}...
            </div>
            <div className="mt-2 text-xs text-gray-500 ">
              Tags:{" "}
              <span className="bg-yellow-300 px-2 py-1 text-gray-500">
                {post.tags?.join(", ")}
              </span>{" "}
              | Category: {post.category}
            </div>
            <button
              onClick={() => dispatch(deletePost(post._id))}
              className="text-red-600 text-sm mt-2 hover:underline"
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default PostList;
