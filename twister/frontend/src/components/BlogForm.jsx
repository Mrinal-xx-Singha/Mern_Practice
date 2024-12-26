import React from "react";

const BlogForm = ({
  title,
  token,
  setTitle,
  content,
  setContent,
  handleCreateBlog,
}) => {
  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Create a Blog</h2>
      <input
        type="text"
        placeholder="Title"
        className="border rounded-lg p-2 mb-2 w-full"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border rounded-lg p-2 mb-4 w-full h-32"
      />
      <button
        onClick={handleCreateBlog}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
      >
        Create Blog
      </button>
    </div>
  );
};

export default BlogForm;
