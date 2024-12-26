import React from "react";

const BlogList = ({ blogs, handleViewBlog, handleDeleteBlog, token }) => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">ALL Blogs</h2>
      {blogs.map((blog) => (
        <div
          key={blog._id}
          className="p-4 bg-gray-100 rounded-lg shadow-md mb-4 flex justify-between items-center"
        >
          <div>
            <h3 className="text-lg font-bold">{blog.title}</h3>
            <p>{blog.content.slice(0, 100)}...</p>
          </div>
          <div>
            <button
              onClick={() => handleViewBlog(blog)}
              className="bg-green-500 text-white py-1 px-3 rounded-lg mr-2 hovcer:bg-green-600"
            >
              View
            </button>
            {token && (
              <button
                onClick={() => handleDeleteBlog(blog._id)}
                className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
