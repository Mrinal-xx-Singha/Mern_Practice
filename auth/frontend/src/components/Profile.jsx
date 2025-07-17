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

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/users/profile?page=${page}`,
        { withCredentials: true }
      );
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
      await axios.put("http://localhost:5000/api/users/profile", form, {
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
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-10 bg-white p-6 rounded-lg shadow-md">
        <div className="relative group">
          <img
            src={avatarPreview || "https://ui-avatars.com/api/?name=User"}
            alt="Avatar"
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-2 border-gray-300"
          />
          {editing && (
            <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full cursor-pointer group-hover:scale-110 transition transform">
              <UploadCloud size={16} />
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
            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
              >
                Edit Profile
              </button>
            ) : null}
          </div>

          <p className="text-gray-500 text-sm mt-1">{user.email}</p>
          <p className="text-gray-600 mt-2">{user.bio}</p>

          <div className="flex gap-4 mt-3 text-gray-500 text-lg">
            <a
              href={user.social?.twitter || "#"}
              title="Twitter"
              target="_blank"
              rel="noreferrer"
              className={`hover:text-blue-400 transition ${
                !user.social?.twitter ? "opacity-40 cursor-not-allowed" : ""
              }`}
              onClick={(e) => !user.social?.twitter && e.preventDefault()}
            >
              <Twitter />
            </a>
            <a
              href={user.social?.github || "#"}
              title="GitHub"
              target="_blank"
              rel="noreferrer"
              className={`hover:text-black transition ${
                !user.social?.github ? "opacity-40 cursor-not-allowed" : ""
              }`}
              onClick={(e) => !user.social?.github && e.preventDefault()}
            >
              <Github />
            </a>
            <a
              href={user.social?.website || "#"}
              title="Website"
              target="_blank"
              rel="noreferrer"
              className={`hover:text-green-600 transition ${
                !user.social?.website ? "opacity-40 cursor-not-allowed" : ""
              }`}
              onClick={(e) => !user.social?.website && e.preventDefault()}
            >
              <Globe />
            </a>
          </div>

          <p className="text-sm text-gray-400 mt-2">
            Joined on {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Editable Fields */}
      {editing && (
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4 mb-8">
          <input
            type="text"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring focus:border-blue-400"
            placeholder="Username"
          />
          <textarea
            rows="3"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring focus:border-blue-400"
            placeholder="Bio"
          />
          <input
            type="text"
            placeholder="Twitter link"
            value={formData.social.twitter}
            onChange={(e) =>
              setFormData({
                ...formData,
                social: { ...formData.social, twitter: e.target.value },
              })
            }
            className="w-full border px-4 py-2 rounded"
          />
          <input
            type="text"
            placeholder="GitHub link"
            value={formData.social.github}
            onChange={(e) =>
              setFormData({
                ...formData,
                social: { ...formData.social, github: e.target.value },
              })
            }
            className="w-full border px-4 py-2 rounded"
          />
          <input
            type="text"
            placeholder="Website link"
            value={formData.social.website}
            onChange={(e) =>
              setFormData({
                ...formData,
                social: { ...formData.social, website: e.target.value },
              })
            }
            className="w-full border px-4 py-2 rounded"
          />

          <div className="flex gap-3 mt-4">
            <button
              onClick={handleUpdateProfile}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-2"
            >
              <Save size={16} />
              Save Changes
            </button>
            <button
              onClick={() => setEditing(false)}
              className="text-red-500 underline flex items-center gap-2"
            >
              <XCircle size={16} />
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Posts Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Posts</h2>
        {posts.length === 0 ? (
          <p className="text-gray-500">You haven’t written any posts yet.</p>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-3">
                  {post.content.slice(0, 120)}...
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}

      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
          className="px-4 py-1 rounded border text-sm transition hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Prev
        </button>
        <span className="text-sm text-gray-600">Page {page}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === totalPage}
          className="px-4 py-1 rounded border text-sm transition hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Profile;
