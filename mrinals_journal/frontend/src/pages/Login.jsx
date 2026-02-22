import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slices/authSlice";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        toast.success("Welcome back!");
        navigate("/feed");
      })
      .catch(() => {
        toast.error("Login failed. Please try again.");
      });
  };

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
            Writely
          </Link>
          <h1
            className="font-serif text-[1.75rem] font-bold mt-8 mb-2"
            style={{ color: "var(--color-text)" }}
          >
            Welcome back.
          </h1>
          <p
            className="text-sm"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Sign in to continue reading and writing.
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
            {error.error || error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--color-text)" }}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="input-clean"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--color-text)" }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="input-clean"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-full text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            style={{
              backgroundColor: "var(--color-text)",
              color: "#fff",
            }}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p
          className="text-sm text-center mt-8"
          style={{ color: "var(--color-text-secondary)" }}
        >
          No account?{" "}
          <Link
            to="/register"
            className="font-semibold"
            style={{ color: "var(--color-accent)" }}
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
