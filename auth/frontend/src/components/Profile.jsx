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

  if (!user) return <div className="text-center py-6">Loading profile...</div>;

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      {/* Avatar + Info */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={avatarPreview || "https://ui-avatars.com/api/?name=User"}
          alt="Avatar"
          className="w-20 h-20 rounded-full object-cover border"
        />
        <div>
          <h1 className="text-2xl font-bold">{user.username}</h1>
          <p className="text-gray-600">{user.email}</p>

          <div className="flex gap-4 mt-2 text-gray-500 text-lg">
            {/* Twitter */}
            <a
              href={user.social?.twitter || "#"}
              target={user.social?.twitter ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className={`hover:text-blue-500 transition ${
                !user.social?.twitter ? "opacity-40 cursor-not-allowed" : ""
              }`}
              onClick={(e) => !user.social?.twitter && e.preventDefault()}
              title="Twitter"
            >
              <Twitter />
            </a>

            {/* GitHub */}
            <a
              href={user.social?.github || "#"}
              target={user.social?.github ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className={`hover:text-black transition ${
                !user.social?.github ? "opacity-40 cursor-not-allowed" : ""
              }`}
              onClick={(e) => !user.social?.github && e.preventDefault()}
              title="GitHub"
            >
              <Github />
            </a>

            {/* Website */}
            <a
              href={user.social?.website || "#"}
              target={user.social?.website ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className={`hover:text-green-600 transition ${
                !user.social?.website ? "opacity-40 cursor-not-allowed" : ""
              }`}
              onClick={(e) => !user.social?.website && e.preventDefault()}
              title="Website"
            >
              <Globe />
            </a>
          </div>

          {user.bio && <p className="text-gray-700 mt-2">{user.bio}</p>}
          <p className="text-sm text-gray-400">
            Joined on {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Edit Profile Form */}
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
              className="w-full border rounded px-3 py-2"
            />
            {/* Social Links */}
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
              className="w-full border rounded px-3 py-2"
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
              className="w-full border rounded px-3 py-2"
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
              className="w-full border rounded px-3 py-2"
            />

            <div className="flex gap-3">
              <button
                onClick={handleUpdateProfile}
                className="bg-green-600 text-white px-4 py-1 rounded flex items-center gap-2"
              >
                <Save size={16} />
                Save
              </button>
              <button
                onClick={() => setEditing(false)}
                className="text-red-500 underline flex items-center gap-1"
              >
                <XCircle size={16} />
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
        <span className="px-4 py-1 font-medium">Page {page}</span>
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
