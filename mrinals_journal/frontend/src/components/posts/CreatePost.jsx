import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../../redux/slices/postSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ImagePlus, X } from "lucide-react";

const CreatePost = () => {
  const [form, setForm] = useState({
    title: "",
    content: "",
    tags: "",
    category: "",
  });

  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviews(previewUrls);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("content", form.content);
    formData.append("category", form.category);
    const tags = form.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
    tags.forEach((tag) => formData.append("tags", tag));
    images.forEach((img) => {
      formData.append("images", img);
    });

    dispatch(createPost(formData))
      .unwrap()
      .then(() => {
        toast.success("Story published!");
        navigate("/feed");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to publish story.");
      });
  };

  return (
    <div
      className="mx-auto py-12 px-6 min-h-screen"
      style={{ maxWidth: "var(--max-width-article)" }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
          className="w-full font-serif text-[2.5rem] font-bold leading-tight outline-none border-none placeholder:font-serif"
          style={{
            color: "var(--color-text)",
            caretColor: "var(--color-text)",
          }}
        />

        {/* Content */}
        <textarea
          placeholder="Tell your story..."
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          required
          className="w-full text-lg leading-relaxed outline-none border-none resize-none min-h-[300px]"
          style={{
            color: "var(--color-text)",
            caretColor: "var(--color-text)",
          }}
        />

        {/* Image previews */}
        {previews.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {previews.map((src, i) => (
              <div key={i} className="relative group">
                <img
                  src={src}
                  alt={`preview-${i}`}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute -top-2 -right-2 p-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  style={{
                    backgroundColor: "var(--color-text)",
                    color: "#fff",
                  }}
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Bottom toolbar */}
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
                required
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

          <div className="flex items-center justify-between">
            <label
              className="flex items-center gap-2 text-sm cursor-pointer transition-colors"
              style={{ color: "var(--color-text-secondary)" }}
            >
              <ImagePlus size={20} />
              <span>Add images</span>
              <input
                type="file"
                multiple
                onChange={handleImageChange}
                className="hidden"
              />
            </label>

            <button type="submit" className="btn-accent px-6 py-2.5">
              Publish
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
