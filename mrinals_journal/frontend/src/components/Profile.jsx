import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Globe, Github, Twitter, UploadCloud, Save, X } from "lucide-react";
import { API_BASE_URL } from "../config/api.js";

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
    social: { twitter: "", github: "", website: "" },
  });

  const API_PROFILE_URL = `${API_BASE_URL}/api/users/profile`;

  const fetchProfile = useCallback(async () => {
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
  }, [API_PROFILE_URL, page]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file?.type.startsWith("image/")) {
      toast.error("Please select a valid image");
      return;
    }
    setFormData({ ...formData, avatar: file });
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleUpdateProfile = async () => {
    const form = new FormData();
    form.append("username", formData.username);
    form.append("bio", formData.bio);
    if (formData.avatar) form.append("avatar", formData.avatar);
    form.append("twitter", formData.social.twitter);
    form.append("github", formData.social.github);
    form.append("website", formData.social.website);

    try {
      await axios.put(API_PROFILE_URL, form, {
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

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  if (!user) {
    return (
      <div
        className="mx-auto py-16 px-6"
        style={{ maxWidth: "var(--max-width-article)" }}
      >
        <div className="animate-pulse space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gray-100" />
            <div className="space-y-2 flex-1">
              <div className="h-5 bg-gray-100 rounded w-1/3" />
              <div className="h-4 bg-gray-100 rounded w-1/4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="mx-auto py-10 px-6 min-h-screen"
      style={{ maxWidth: "var(--max-width-article)" }}
    >
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
        {/* Avatar */}
        <div className="relative group">
          <img
            src={
              avatarPreview ||
              `https://ui-avatars.com/api/?name=${user.username}&background=f0f0f0&color=242424&bold=true&size=128`
            }
            alt="Avatar"
            className="w-20 h-20 rounded-full object-cover"
            style={{ border: "2px solid var(--color-border)" }}
          />
          {editing && (
            <label
              className="absolute bottom-0 right-0 p-1.5 rounded-full cursor-pointer transition-colors"
              style={{
                backgroundColor: "var(--color-text)",
                color: "#fff",
              }}
            >
              <UploadCloud size={14} />
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </label>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
            <h1
              className="font-serif text-2xl font-bold"
              style={{ color: "var(--color-text)" }}
            >
              {user.username}
            </h1>
            {!editing && (
              <button
                onClick={() => setEditing(true)}
                className="text-sm font-medium cursor-pointer px-3 py-1 rounded-full"
                style={{
                  color: "var(--color-accent)",
                  border: "1px solid var(--color-accent)",
                }}
              >
                Edit profile
              </button>
            )}
          </div>

          <p
            className="text-sm mb-2"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {user.bio || "No bio yet."}
          </p>

          {/* Social */}
          <div className="flex items-center gap-4 justify-center sm:justify-start">
            {user.social?.twitter && (
              <a
                href={user.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--color-text-muted)" }}
              >
                <Twitter size={18} />
              </a>
            )}
            {user.social?.github && (
              <a
                href={user.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--color-text-muted)" }}
              >
                <Github size={18} />
              </a>
            )}
            {user.social?.website && (
              <a
                href={user.social.website}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--color-text-muted)" }}
              >
                <Globe size={18} />
              </a>
            )}
            <span
              className="text-xs"
              style={{ color: "var(--color-text-muted)" }}
            >
              Member since {formatDate(user.createdAt)}
            </span>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      {editing && (
        <div
          className="mb-10 p-6 rounded-lg space-y-5 animate-fade-in"
          style={{
            backgroundColor: "var(--color-bg-subtle)",
            border: "1px solid var(--color-border)",
          }}
        >
          <div>
            <label
              className="block text-xs font-medium mb-1.5 uppercase tracking-wider"
              style={{ color: "var(--color-text-muted)" }}
            >
              Username
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              className="input-clean text-sm"
            />
          </div>

          <div>
            <label
              className="block text-xs font-medium mb-1.5 uppercase tracking-wider"
              style={{ color: "var(--color-text-muted)" }}
            >
              Bio
            </label>
            <textarea
              rows={3}
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              placeholder="Tell us about yourself..."
              className="w-full text-sm py-2 outline-none resize-none bg-transparent"
              style={{
                borderBottom: "1px solid var(--color-border)",
                color: "var(--color-text)",
              }}
            />
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {["twitter", "github", "website"].map((field) => (
              <div key={field}>
                <label
                  className="block text-xs font-medium mb-1.5 uppercase tracking-wider"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {field}
                </label>
                <input
                  type="text"
                  placeholder={`${field} URL`}
                  value={formData.social[field]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      social: { ...formData.social, [field]: e.target.value },
                    })
                  }
                  className="input-clean text-sm"
                />
              </div>
            ))}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleUpdateProfile}
              className="btn-accent flex items-center gap-2 px-5 py-2"
            >
              <Save size={16} />
              Save
            </button>
            <button
              onClick={() => {
                setEditing(false);
                setFormData({
                  username: user.username,
                  avatar: null,
                  bio: user.bio || "",
                  social: {
                    twitter: user.social?.twitter || "",
                    github: user.social?.github || "",
                    website: user.social?.website || "",
                  },
                });
                setAvatarPreview(user.avatar || "");
              }}
              className="flex items-center gap-1 text-sm cursor-pointer px-4 py-2 rounded-full transition-colors"
              style={{
                color: "var(--color-text-secondary)",
                border: "1px solid var(--color-border)",
              }}
            >
              <X size={16} />
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Posts */}
      <div>
        <h2
          className="font-serif text-xl font-bold mb-6 pb-3"
          style={{
            color: "var(--color-text)",
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          Your Stories
        </h2>
        {posts.length === 0 ? (
          <p
            className="text-center py-10 font-serif"
            style={{ color: "var(--color-text-muted)" }}
          >
            You haven't published any stories yet.
          </p>
        ) : (
          <div className="space-y-0">
            {posts.map((post) => (
              <Link
                to={`/posts/${post._id}`}
                key={post._id}
                className="block group py-5"
                style={{ borderBottom: "1px solid var(--color-border)" }}
              >
                <h3
                  className="font-serif font-bold leading-snug mb-1 group-hover:underline decoration-1 underline-offset-2"
                  style={{ color: "var(--color-text)" }}
                >
                  {post.title}
                </h3>
                <p
                  className="text-sm line-clamp-2 mb-2"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {post.content?.slice(0, 150)}
                </p>
                <span
                  className="text-xs"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPage > 1 && (
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page === 1}
            className="px-4 py-2 text-sm font-medium rounded-full transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            style={{
              border: "1px solid var(--color-border)",
              color: "var(--color-text-secondary)",
            }}
          >
            ← Prev
          </button>
          <span
            className="text-sm"
            style={{ color: "var(--color-text-muted)" }}
          >
            {page} / {totalPage}
          </span>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page === totalPage}
            className="px-4 py-2 text-sm font-medium rounded-full transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            style={{
              border: "1px solid var(--color-border)",
              color: "var(--color-text-secondary)",
            }}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
