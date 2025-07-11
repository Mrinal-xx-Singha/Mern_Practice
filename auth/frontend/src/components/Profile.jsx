import axios from "axios";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    avatar: null,
    bio: "",
  });

  useEffect(() => {
    fetchProfile();
  }, [page]);

  console.log(user);
  // fetch the profile
  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/users/profile?page=${page}`,
        { withCredentials: true }
      );
      setUser(res.data.user);
      setPosts(res.data.posts);
      setTotalPage(res.data.totalPage);
      setFormData({
        username: res.data.user.username,
        avatar: null,
        bio: res.data.bio || "",
      });
      setAvatarPreview(res.data.user.avatar || "");
    } catch (error) {
      console.error("Profile load failed", error);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file?.type.startsWith("image/")) {
      alert("Please select a valid image file");
      return;
    }
    setFormData({ ...formData, avatar: file });
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleUpdateProfile = async () => {
    const form = new FormData();
    form.append("username", formData.username);
    form.append("bio",formData.bio)
    if (formData.avatar) {
      form.append("avatar", formData.avatar);
    }

    try {
      await axios.put("http://localhost:5000/api/users/profile", form, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      setEditing(false);
      fetchProfile();
    } catch (err) {
      console.error("Profile update failed", err);
    }
  };

  if (!user) return <div className="text-center py-6">Loading profile...</div>;

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="flex items-center gap-4 mb-6">
        <img
          src={avatarPreview || "https://ui-avatars.com/api/?name=User "}
          alt="Avatar"
          className="w-20 h-20 rounded-full object-cover border"
        />
        <div>
          <h1 className="text-2xl font-bold">{user.username}</h1>
          <p className="text-gray-600">{user.email}</p>
          {
            user.bio &&(
              <p className="text-gray-600 mb-1">
                {user.bio}
              </p>
            )}
          <p className="text-sm text-gray-400">
            Joined on {new Date(user.createdAt).toLocaleDateString()}
          </p>

        </div>
      </div>

      {/* Edit Profile */}
      <div className="mb-6">
        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
          >
            Edit Profile
          </button>
        ) : (
          <div className="space-y-3 mt-4">
            <input
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              className="w-full border rounded px-3 py-2"
              placeholder="Username"
            />
            <textarea
              rows="4"
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              className="w-full border rounded px-3 py-2"
              placeholder="Write something about yourself..."
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="w-full border"
            />
            <div className="flex gap-3">
              <button
                onClick={handleUpdateProfile}
                className="bg-green-600 text-white px-4 py-1 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setEditing(false)}
                className="text-red-500 underline"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* User Posts */}
      <h2 className="text-xl font-semibold mb-3">Your Posts</h2>
      {posts.length === 0 ? (
        <p className="text-gray-500">You haven't written any posts yet.</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} className="bg-white p-4 mb-3 shadow rounded">
            <h3 className="font-bold text-lg">{post.title}</h3>
            <p className="text-sm text-gray-600">
              {post.content.slice(0, 100)}...
            </p>
          </div>
        ))
      )}

      {/* Pagination */}
      <div className="flex gap-2 justify-center mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className={`px-4 py-1 rounded ${
            page === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white"
          }`}
        >
          Prev
        </button>
        <span className="px-4 py-1">{page}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === totalPage}
          className={`px-4 py-1 rounded ${
            page === totalPage
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Profile;
