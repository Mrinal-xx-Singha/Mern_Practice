import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUser,
  clearAuthError,
  clearRegistered,
} from "../redux/slices/authSlice";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, loading, registered } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(form))
      .unwrap()
      .then(() => {
        toast.success("Account created! Please sign in.");
      })
      .catch(() => {
        toast.error("Registration failed. Please try again.");
      });
  };

  useEffect(() => {
    if (registered) {
      navigate("/login");
      dispatch(clearRegistered());
    }
  }, [registered, navigate, dispatch]);

  useEffect(() => {
    return () => dispatch(clearAuthError());
  }, [dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-[400px] animate-fade-in">
        {/* Header */}
        <div className="text-center mb-10">
          <Link
            to="/"
            className="font-serif text-2xl font-bold"
            style={{ color: "var(--color-text)" }}
          >
            Mrinal's Journal
          </Link>
          <h1
            className="font-serif text-[1.75rem] font-bold mt-8 mb-2"
            style={{ color: "var(--color-text)" }}
          >
            Join us.
          </h1>
          <p
            className="text-sm"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Create an account to start writing and sharing stories.
          </p>
        </div>

        {error && (
          <div
            className="text-sm text-center py-2 px-4 rounded-lg mb-6"
            style={{
              backgroundColor: "#fef2f2",
              color: "var(--color-danger)",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--color-text)" }}
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Your name"
              value={form.username}
              onChange={handleChange}
              required
              className="input-clean"
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--color-text)" }}
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
              className="input-clean"
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--color-text)" }}
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
              className="input-clean"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-full text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            style={{
              backgroundColor: "var(--color-accent)",
              color: "#fff",
            }}
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p
          className="text-sm text-center mt-8"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold"
            style={{ color: "var(--color-accent)" }}
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
