import React from "react";

const BlogDetails = ({ selectedBlog, setSelectedBlog }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-3/4">
        <h2 className="text-xl font-bold mb-4">{selectedBlog.title}</h2>
        <p>{selectedBlog.content}</p>
        <button
          onClick={() => setSelectedBlog(null)}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 mt-4"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default BlogDetails;
