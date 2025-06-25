import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../../redux/slices/postSlice";
const CreatePost = () => {
  const [form, setForm] = useState({
    title: "",
    content: "",
    tags: "",
    category: "",
  });
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()),
    };
    dispatch(createPost(data));
  };
  return (
    <div className="max-w-2xl mx-auto py-6">
      <h2 className="text-2xl font-semibold mb-4 px-2">Create new Post</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md space-y-4"
      >
        <input
          placeholder="Title"
          value={form.title}
          className="w-full border p-2"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          className="w-full border p-2"
          rows={6}
          placeholder="Content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />
        <input
          placeholder="Tags (coma separated)"
          className="w-full border p-2"
          value={form.tags}
          onChange={(e) => setForm({ ...form, tags: e.target.value })}
        />
        <input
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="w-full border p-2"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded "
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
