import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, demoLogin } from "../redux/slices/authSlice";
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

  const handleDemoLogin = (role) => {
    dispatch(demoLogin(role))
      .unwrap()
      .then(() => {
        toast.success(`Welcome to the demo (${role})!`);
        navigate(role === "admin" ? "/admin" : "/feed");
      })
      .catch(() => {
        toast.error("Demo login failed. Please try again.");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-[420px] animate-fade-in">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            to="/"
            className="font-serif text-2xl font-bold"
            style={{ color: "var(--color-text)" }}
          >
            Writely
          </Link>
          <h1
            className="font-serif text-[1.75rem] font-bold mt-6 mb-2"
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

        {/* Recruiter / Quick Demo Access */}
        <div
          className="mb-6 p-5 rounded-2xl border shadow-sm transition-colors"
          style={{
            backgroundColor: "var(--color-bg-subtle)",
            borderColor: "var(--color-border)",
          }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-wider text-center mb-3.5"
            style={{ color: "var(--color-text-secondary)" }}
          >
            🚀 Recruiter & Instant Demo Access
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleDemoLogin("user")}
              disabled={loading}
              className="py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border transition-opacity cursor-pointer shadow-xs disabled:opacity-50 hover:opacity-85"
              style={{
                color: "var(--color-text)",
                backgroundColor: "var(--color-bg)",
                borderColor: "var(--color-border)",
              }}
            >
              <span>👤 Demo User</span>
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin("admin")}
              disabled={loading}
              className="py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border transition-opacity cursor-pointer shadow-xs disabled:opacity-50 hover:opacity-85"
              style={{
                color: "var(--color-btn-invert-text)",
                backgroundColor: "var(--color-btn-invert-bg)",
                borderColor: "var(--color-border)",
              }}
            >
              <span>🛡️ Demo Admin</span>
            </button>
          </div>
        </div>

        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div
              className="w-full border-t"
              style={{ borderColor: "var(--color-border)" }}
            ></div>
          </div>
          <span
            className="relative px-3 text-xs uppercase"
            style={{
              color: "var(--color-text-muted)",
              backgroundColor: "var(--color-bg)",
            }}
          >
            or sign in with credentials
          </span>
        </div>

        {error && (
          <div
            className="text-sm text-center py-2 px-4 rounded-lg mb-6 border"
            style={{
              backgroundColor: "var(--color-bg-subtle)",
              borderColor: "var(--color-danger)",
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
            className="w-full py-2.5 rounded-full text-sm font-medium transition-opacity disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:opacity-90"
            style={{
              backgroundColor: "var(--color-btn-invert-bg)",
              color: "var(--color-btn-invert-text)",
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
