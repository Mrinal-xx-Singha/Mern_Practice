import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../../config/api.js";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    content: "",
    tags: "",
    category: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/posts/${id}`)
      .then((res) => {
        const { tags, title, category, content } = res.data;
        setForm({ title, content, tags: tags.join(", "), category });
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load post");
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${API_BASE_URL}/api/posts/${id}`,
        {
          ...form,
          tags: form.tags.split(",").map((t) => t.trim()),
        },
        { withCredentials: true },
      );
      navigate(`/posts/${id}`);
      toast.success("Story updated!");
    } catch (error) {
      console.error("Update failed", error.message);
      toast.error("Update failed");
    }
  };

  if (loading) {
    return (
      <div
        className="mx-auto py-12 px-6 min-h-screen"
        style={{ maxWidth: "var(--max-width-article)" }}
      >
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-100 rounded w-1/2" />
          <div className="h-40 bg-gray-100 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div
      className="mx-auto py-12 px-6 min-h-screen"
      style={{ maxWidth: "var(--max-width-article)" }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full font-serif text-[2.5rem] font-bold leading-tight outline-none border-none placeholder:font-serif"
          style={{ color: "var(--color-text)" }}
        />

        <textarea
          placeholder="Tell your story..."
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className="w-full text-lg leading-relaxed outline-none border-none resize-none min-h-[300px]"
          style={{ color: "var(--color-text)" }}
        />

        <div
          className="pt-6"
          style={{ borderTop: "1px solid var(--color-border)" }}
        >
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <label
                className="block text-xs font-medium mb-1.5 uppercase tracking-wider"
                style={{ color: "var(--color-text-muted)" }}
              >
                Category
              </label>
              <input
                type="text"
                placeholder="e.g. Web Development"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="input-clean text-sm"
              />
            </div>
            <div className="flex-1">
              <label
                className="block text-xs font-medium mb-1.5 uppercase tracking-wider"
                style={{ color: "var(--color-text-muted)" }}
              >
                Tags (comma separated)
              </label>
              <input
                type="text"
                placeholder="e.g. react, javascript"
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
                className="input-clean text-sm"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button type="submit" className="btn-accent px-6 py-2.5">
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
