import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../../redux/slices/postSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CreatePost = () => {
  const [form, setForm] = useState({
    title: "",
    content: "",
    tags: "",
    category: "",
  });

  const [images, setImages] = useState([]); // for storing image file
  const [previews, setPreviews] = useState([]); // image preview
  console.log(images);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviews(previewUrls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("content", form.content);
    formData.append("category", form.category);
    formData.append(
      "tags",
      JSON.stringify(form.tags.split(",").map((tag) => tag.trim()))
    );
    images.forEach((img) => {
      formData.append("images", img);
    });

    dispatch(createPost(formData))
      .unwrap()
      .then(() => {
        toast.success("Post Created!");
        navigate("/feed");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to create post.");
      });

    console.log("Form Data Debug:");
    console.log(formData.get("title"));
    console.log(formData.get("content"));
    console.log(formData.get("tags"));
    console.log(formData.get("category"));
    console.log(images.length, "images selected");
    console.log(formData)
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Create New Post
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 space-y-5"
        encType="multipart/form-data"
      >
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            placeholder="Enter post title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Content{" "}
            <span className="text-xs text-gray-400">(Markdown supported)</span>
          </label>
          <textarea
            placeholder="Write your post content here..."
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            className="w-full border rounded px-3 py-2 h-32 resize-none"
            required
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            placeholder="e.g. react, javascript, tailwind"
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <input
            type="text"
            placeholder="e.g. Web Development"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Image
          </label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
          {previews.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {previews.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`preview-${i}`}
                  className="w-full max-h-60 object-cover rounded shadow"
                />
              ))}
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-medium"
        >
          Publish Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
