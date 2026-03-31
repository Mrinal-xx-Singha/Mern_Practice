import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import {
  Trash2,
  ShieldCheck,
  User,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  getAllUsers,
  updateUserRole,
  deleteUser,
} from "../services/adminService";

//  Confirmation Modal
const ConfirmModal = ({ user, onConfirm, onCancel }) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center p-4"
    style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
  >
    <div
      className="w-full max-w-sm rounded-xl p-6 space-y-4 animate-fade-in"
      style={{
        backgroundColor: "var(--color-bg)",
        border: "1px solid var(--color-border)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: "#fef2f2" }}
        >
          <AlertTriangle size={20} style={{ color: "var(--color-danger)" }} />
        </div>
        <div>
          <p
            className="font-semibold text-sm"
            style={{ color: "var(--color-text)" }}
          >
            Delete account
          </p>
          <p
            className="text-xs mt-0.5"
            style={{ color: "var(--color-text-muted)" }}
          >
            This action is irreversible.
          </p>
        </div>
      </div>
      <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
        Are you sure you want to delete{" "}
        <span className="font-semibold" style={{ color: "var(--color-text)" }}>
          {user.username}
        </span>
        's account? All their data will be permanently removed.
      </p>
      <div className="flex gap-3 pt-1">
        <button
          onClick={onConfirm}
          className="flex-1 py-2 rounded-full text-sm font-medium text-white transition-colors"
          style={{ backgroundColor: "var(--color-danger)" }}
        >
          Yes, delete
        </button>
        <button
          onClick={onCancel}
          className="flex-1 py-2 rounded-full text-sm font-medium transition-colors"
          style={{
            border: "1px solid var(--color-border)",
            color: "var(--color-text-secondary)",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
);

// Skeleton Row
const SkeletonRow = () => (
  <tr className="animate-pulse">
    <td className="px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gray-100 flex-shrink-0" />
        <div className="space-y-1.5">
          <div className="h-3 w-24 bg-gray-100 rounded" />
          <div className="h-2.5 w-32 bg-gray-100 rounded" />
        </div>
      </div>
    </td>
    <td className="px-4 py-3">
      <div className="h-3 w-16 bg-gray-100 rounded" />
    </td>
    <td className="px-4 py-3">
      <div className="h-3 w-20 bg-gray-100 rounded" />
    </td>
    <td className="px-4 py-3">
      <div className="h-3 w-8 bg-gray-100 rounded" />
    </td>
  </tr>
);

//Main Component
const AdminDashboard = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null); // user object to delete

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleRoleChange = async (userId, newRole) => {
    setUpdatingId(userId);
    try {
      await updateUserRole(userId, newRole);
      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u)),
      );
      toast.success(`Role updated to ${newRole}`);
    } catch {
      toast.error("Failed to update role");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers((prev) => prev.filter((u) => u._id !== userId));
      toast.success("User deleted");
    } catch {
      toast.error("Failed to delete user");
    } finally {
      setConfirmDelete(null);
    }
  };

  // Stats
  const totalUsers = users.length;
  const totalAdmins = users.filter((u) => u.role === "admin").length;

  return (
    <div
      className="mx-auto px-6 py-10 min-h-screen"
      style={{ maxWidth: "var(--max-width-page)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1
            className="font-serif text-3xl font-bold"
            style={{ color: "var(--color-text)" }}
          >
            Admin Dashboard
          </h1>
          <p
            className="text-sm mt-1"
            style={{ color: "var(--color-text-muted)" }}
          >
            Manage all user accounts and roles
          </p>
        </div>
        <button
          onClick={fetchUsers}
          disabled={loading}
          className="flex items-center gap-2 text-sm px-4 py-2 rounded-full transition-colors cursor-pointer disabled:opacity-50"
          style={{
            border: "1px solid var(--color-border)",
            color: "var(--color-text-secondary)",
          }}
        >
          <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Total Users", value: totalUsers, icon: <User size={18} /> },
          {
            label: "Admins",
            value: totalAdmins,
            icon: <ShieldCheck size={18} />,
          },
          {
            label: "Regular Users",
            value: totalUsers - totalAdmins,
            icon: <User size={18} />,
          },
        ].map(({ label, value, icon }) => (
          <div
            key={label}
            className="rounded-xl p-5"
            style={{
              backgroundColor: "var(--color-bg-subtle)",
              border: "1px solid var(--color-border)",
            }}
          >
            <div
              className="flex items-center gap-2 mb-2"
              style={{ color: "var(--color-text-muted)" }}
            >
              {icon}
              <span className="text-xs font-medium uppercase tracking-wider">
                {label}
              </span>
            </div>
            <p
              className="font-serif text-3xl font-bold"
              style={{ color: "var(--color-text)" }}
            >
              {loading ? "—" : value}
            </p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div
        className="rounded-xl overflow-hidden"
        style={{ border: "1px solid var(--color-border)" }}
      >
        <div
          className="px-5 py-3.5 flex items-center justify-between"
          style={{
            borderBottom: "1px solid var(--color-border)",
            backgroundColor: "var(--color-bg-subtle)",
          }}
        >
          <p
            className="text-sm font-medium"
            style={{ color: "var(--color-text)" }}
          >
            All Users
          </p>
          <span
            className="text-xs px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: "var(--color-border)",
              color: "var(--color-text-secondary)",
            }}
          >
            {totalUsers}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                {["User", "Role", "Joined", "Actions"].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
              ) : users.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-12 text-center text-sm"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((u, idx) => (
                  <tr
                    key={u._id}
                    style={{
                      borderBottom:
                        idx < users.length - 1
                          ? "1px solid var(--color-border)"
                          : "none",
                      backgroundColor:
                        idx % 2 === 0
                          ? "var(--color-bg)"
                          : "var(--color-bg-subtle)",
                    }}
                  >
                    {/* User cell */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            u.avatar ||
                            `https://ui-avatars.com/api/?name=${u.username}&background=f0f0f0&color=242424&bold=true&size=64`
                          }
                          alt={u.username}
                          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                          style={{ border: "1px solid var(--color-border)" }}
                        />
                        <div>
                          <p
                            className="font-medium"
                            style={{ color: "var(--color-text)" }}
                          >
                            {u.username}
                            {u._id === currentUser?._id && (
                              <span
                                className="ml-2 text-[10px] px-1.5 py-0.5 rounded-full font-normal"
                                style={{
                                  backgroundColor: "var(--color-border)",
                                  color: "var(--color-text-muted)",
                                }}
                              >
                                you
                              </span>
                            )}
                          </p>
                          <p
                            className="text-xs"
                            style={{ color: "var(--color-text-muted)" }}
                          >
                            {u.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Role cell */}
                    <td className="px-4 py-3">
                      <select
                        value={u.role}
                        disabled={
                          updatingId === u._id || u._id === currentUser?._id
                        }
                        onChange={(e) =>
                          handleRoleChange(u._id, e.target.value)
                        }
                        className="text-xs rounded-full px-3 py-1 font-medium cursor-pointer outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        style={{
                          border: "1px solid var(--color-border)",
                          backgroundColor:
                            u.role === "admin"
                              ? "#f0fdf4"
                              : "var(--color-bg-subtle)",
                          color:
                            u.role === "admin"
                              ? "var(--color-accent)"
                              : "var(--color-text-secondary)",
                        }}
                      >
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                      </select>
                    </td>

                    {/* Joined cell */}
                    <td
                      className="px-4 py-3 text-xs"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {new Date(u.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>

                    {/* Actions cell */}
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setConfirmDelete(u)}
                        disabled={u._id === currentUser?._id}
                        title="Delete user"
                        className="p-1.5 rounded-full transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                        style={{ color: "var(--color-text-muted)" }}
                        onMouseEnter={(e) => {
                          if (u._id !== currentUser?._id)
                            e.currentTarget.style.color = "var(--color-danger)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color =
                            "var(--color-text-muted)";
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <ConfirmModal
          user={confirmDelete}
          onConfirm={() => handleDelete(confirmDelete._id)}
          onCancel={() => setConfirmDelete(null)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
