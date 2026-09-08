import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../../config/api.js";
import { ImagePlus, X } from "lucide-react";
import MDEditor from "@uiw/react-md-editor";


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
  const [images, setImages] = useState([])
  const [preview, setPreview] = useState([])


  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    setImages(files)
    const previewUrls = files.map((file) => URL.createObjectURL(file))
    setPreview(previewUrls)
  }

  const removeImage = index => {
    setImages((prev) => prev.filter((_, i) => i !== index))
    setPreview((prev) => prev.filter((_, i) => i !== index))
  }

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

  const handleCancel = () => {
    navigate(`/posts/${id}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData()
      formData.append('title', form.title)
      formData.append('content', form.content)
      formData.append('category', form.category)

      // Append tags safely
      const tagArray = form.tags.split(',').map((t) => t.trim()).filter(Boolean)
      tagArray.forEach((tag) => formData.append('tags', tag))

      // Append new images
      images.forEach((img) => {
        formData.append('images', img)
      })



      await axios.put(
        `${API_BASE_URL}/api/posts/${id}`,

        formData
        ,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" }

        },
      );

      navigate(`/posts/${id}`);
      toast.success("Story updated!");
    } catch (error) {
      console.error("Update failed", error.response?.data || error.message);
      toast.error(error.response?.data?.error || "Update failed");
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

        <div
          data-color-mode="light"
          className="mb-6 rounded-xl overflow-hidden border"
          style={{ borderColor: "var(--color-border)" }}

        >
          <MDEditor
            value={form.content}
            onChange={(val) => setForm({ ...form, content: val })}
            preview="edit"
            height={400}
            hideToolbar={false}
            style={{
              backgroundColor: "var(--color-bg)",
              color: "var(--color-text)"
            }}
          />
        </div>

        <div
          className="pt-6"
          style={{ borderTop: "1px solid var(--color-border)" }}
        >
          {/* Image previews */}
          {preview.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {preview.map((src, i) => (
                <div key={i} className="relative group">
                  <img
                    src={src}
                    alt={`preview-${i}`}
                    className="w-24 h-24 object-cover rounded-lg border border-(--color-border)"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute -top-2 -right-2 p-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow"
                    style={{ backgroundColor: "var(--color-danger)", color: "#fff" }}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
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

          <div className="flex justify-between items-center">
            <label
              className="flex items-center gap-2 text-sm cursor-pointer transition-colors"
              style={{ color: "var(--color-text-secondary)" }}
            >
              <ImagePlus size={20} />
              <span>Add new Images</span>
              <input type="file" multiple onChange={handleImageChange} className="hidden" />
            </label>
            <div className="flex items-center gap-4">

              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button type="submit" className="btn-accent px-6 py-2.5">
                Update
              </button>

            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
