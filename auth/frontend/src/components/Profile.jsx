import axios from "axios";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/profile", {
          withCredentials: true,
        });
        setUser(res.data.user);
        setPosts(res.data.posts);
      } catch (error) {
        console.error("Profile load failed", error);
      }
    };
    fetchPosts();
  }, []);

  if (!user) return <div className="text-center py-6">Loading profile...</div>;
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-2">{user.username}</h1>
      <p className="text-gray-600 mb-4">{user.email}</p>
      <p className="text-sm text-gray-400 mb-6">
        Joined on {new Date(user.createdAt).toLocaleDateString()}
      </p>

      <h2
      className="text-xl font-semibold mb-3"
      >Your Posts</h2>
      {posts.length === 0 ? (
        <p className="text-gray-500">You haven't written any posts yet.</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} className="bg-white p-4 mb-3 shadow rounded">
            <h3 className="font-bold text-lg">{post.title}</h3>
            <p className="text-sm text-gray-600">
              {post.content.slice(0, 100)}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default Profile;
