import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    content: "",
    tags: "",
    category: "",
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/posts/${id}`).then((res) => {
      const { tags, title, category, content } = res.data;
      setForm({ title, content, tags: tags.join(", "), category });
    });
  }, [id]);

  const handleSubmit =async(e)=>{
    e.preventDefault()
    try {
      await axios.put(`http://localhost:5000/api/posts/${id}`,{
        ...form,
        tags:form.tags.split(",").map(t=>t.trim())
      })
      navigate(`/posts/${id}`)
      toast.success("Post Updated Successfully!")
    } catch (error) {
      console.error("Update failed")
      toast.error("Update failed")
    }
  }
  return (
    <div className="max-w-2xl mx-auto py-6">
      <h2 className="text-xl font-semibold mb-4 px-2 ">Edit Post</h2>
      <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow space-y-4">
        <input
          className="w-full border p-2"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          rows={6}
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className="w-full border p-2"
        />
        <input
          className="w-full border p-2"
          value={form.tags}
          onChange={(e) => setForm({ ...form, tags: e.target.value })}
        />
        <input
          className="w-full borer p-2"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <button
          type="submit"
          className="bg-yellow-500 text-white px-4 py-2 rounded "
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditPost;
