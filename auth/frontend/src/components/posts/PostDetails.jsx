import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/posts/${id}`)
      .then((res) => setPost(res.data));
  }, [id]);

  if (!post) return <div>Loading...</div>;
  console.log(post);

  const isAuthor = user && post.author._id === user._id;
  const PostCreatedAt = new Date(post.createdAt).toLocaleString('en-us',{
    month:'long',
    day:'numeric',
    year:'numeric',
    hour:'numeric',
    minute:'numeric',
    hour12:true
  })

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 h-screen">
      <h1 className="text-3xl font-bold mb-2 text-center tracking-wide uppercase">
        {post.title}
      </h1>
      <p className="text-gray-500  mb-4 text-lg">By {post.author.username}-{PostCreatedAt}</p>
      <div className="text-gray-800 mb-4 text-justify tracking-wide">
        {post.content}
        <p className="text-sm text-gray-600 pt-4">
          <span className="bg-yellow-400 px-2 py-1">
            Tags:{post.tags.join(", ")}
          </span>
          |Category:<b>{post.category}</b>
        </p>
        {isAuthor && (
          <div className="flex gap-4 mt-4">
            <button className="text-blue-600 hover:underline">Edit</button>

            <button className="text-red-600 hover:underline">Delete</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetails;
