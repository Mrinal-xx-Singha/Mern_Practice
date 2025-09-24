import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Globe,
  Github,
  Twitter,
  UploadCloud,
  Save,
  XCircle,
} from "lucide-react"; // All valid Lucide icons

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
    social: {
      twitter: "",
      github: "",
      website: "",
    },
  });

  useEffect(() => {
    fetchProfile();
  }, [page]);
  const API_PROFILE_URL = "http://localhost:5000/api/users/profile";
  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${API_PROFILE_URL}?page=${page}`, {
        withCredentials: true,
      });
      const u = res.data.user;
      setUser(u);
      setPosts(res.data.posts);
      setTotalPage(res.data.totalPage);
      setFormData({
        username: u.username,
        avatar: null,
        bio: u.bio || "",
        social: {
          twitter: u.social?.twitter || "",
          github: u.social?.github || "",
          website: u.social?.website || "",
        },
      });
      setAvatarPreview(u.avatar || "");
    } catch (error) {
      console.error("Profile load failed", error);
      toast.error("Failed to load profile");
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file?.type.startsWith("image/")) {
      toast.error("Please select a valid image");
      return;
    }
    setFormData({ ...formData, avatar: file });
    setAvatarPreview(URL.createObjectURL(file));
    toast.success("Profile picture updated");
  };

  const handleUpdateProfile = async () => {
    const form = new FormData();
    form.append("username", formData.username);
    form.append("bio", formData.bio);
    if (formData.avatar) {
      form.append("avatar", formData.avatar);
    }
    form.append("twitter", formData.social.twitter);
    form.append("github", formData.social.github);
    form.append("website", formData.social.website);

    try {
      await axios.put(`${API_PROFILE_URL}`, form, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      setEditing(false);
      fetchProfile();
      toast.success("Profile updated");
    } catch (err) {
      console.error("Profile update failed", err);
      toast.error("Failed to update profile");
    }
  };

  if (!user)
    return (
      <div className="text-center py-10 text-gray-500 text-lg">
        Loading profile...
      </div>
    );
  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-0">
      {/* Profile Info */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-10 bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        <div className="relative group">
          <img
            src={avatarPreview || "https://ui-avatars.com/api/?name=User"}
            alt="Avatar"
            className="w-28 h-28 rounded-full object-cover border-4 border-gray-200 shadow-md"
          />
          {editing && (
            <label className="absolute bottom-1 right-1 bg-blue-600 text-white p-2 rounded-full cursor-pointer shadow-md hover:bg-blue-700 transition-all">
              <UploadCloud size={18} />
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </label>
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">
              {user.username}
            </h1>
            {!editing && (
              <button
                onClick={() => setEditing(true)}
                className="bg-blue-600 text-white px-4 py-1.5 rounded-lg shadow hover:bg-blue-700 transition-all"
              >
                Edit Profile
              </button>
            )}
          </div>

          <p className="text-gray-500 text-sm mt-1">{user.email}</p>
          <p className="text-gray-600 mt-2">{user.bio}</p>

          {/* Social Icons */}
          <div className="flex gap-5 mt-4 text-gray-500 text-xl">
            <a
              href={user.social?.twitter || "#"}
              className={`hover:text-blue-400 transition ${
                !user.social?.twitter ? "opacity-40 cursor-not-allowed" : ""
              }`}
              onClick={(e) => !user.social?.twitter && e.preventDefault()}
            >
              <Twitter />
            </a>
            <a
              href={user.social?.github || "#"}
              className={`hover:text-gray-800 transition ${
                !user.social?.github ? "opacity-40 cursor-not-allowed" : ""
              }`}
              onClick={(e) => !user.social?.github && e.preventDefault()}
            >
              <Github />
            </a>
            <a
              href={user.social?.website || "#"}
              className={`hover:text-green-600 transition ${
                !user.social?.website ? "opacity-40 cursor-not-allowed" : ""
              }`}
              onClick={(e) => !user.social?.website && e.preventDefault()}
            >
              <Globe />
            </a>
          </div>

          <p className="text-sm text-gray-400 mt-3">
            Joined on{" "}
            <span className="font-medium text-gray-600">
              {new Date(user.createdAt).toLocaleDateString()}
            </span>
          </p>
        </div>
      </div>

      {/* Editable Fields */}
      {editing && (
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 space-y-5 mb-10">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Username
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Bio
            </label>
            <textarea
              rows="3"
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Tell us about yourself..."
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {["twitter", "github", "website"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-600 mb-1 capitalize">
                  {field}
                </label>
                <input
                  type="text"
                  placeholder={`${field} link`}
                  value={formData.social[field]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      social: { ...formData.social, [field]: e.target.value },
                    })
                  }
                  className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-2">
            <button
              onClick={handleUpdateProfile}
              className="bg-green-600 text-white px-5 py-2 rounded-lg shadow hover:bg-green-700 transition flex items-center gap-2"
            >
              <Save size={18} />
              Save
            </button>
            <button
              onClick={() => setEditing(false)}
              className="text-red-500 font-medium hover:text-red-600 flex items-center gap-2"
            >
              <XCircle size={18} />
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Posts */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-5">Your Posts</h2>
        {posts.length === 0 ? (
          <p className="text-gray-500 italic">
            You haven’t written any posts yet.
          </p>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                  {post.content.slice(0, 120)}...
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-10">
        <button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
          className="px-4 py-1.5 rounded-full border text-sm font-medium transition-all hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Prev
        </button>
        <span className="text-sm font-medium text-gray-700">
          Page {page} of {totalPage}
        </span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === totalPage}
          className="px-4 py-1.5 rounded-full border text-sm font-medium transition-all hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Profile;
