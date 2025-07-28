import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slices/authSlice";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock } from "lucide-react";

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
        toast.success("🎉 Login Successful!");
        navigate("/feed");
      })
      .catch(() => {
        toast.error("❌ Login failed. Please try again.");
      });
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Left - Login Form */}
      <div className="flex flex-col justify-center px-6 md:px-12 lg:px-20">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 "
        >
          <h2 className="text-3xl font-semibold text-center text-blue-600 dark:text-blue-400 mb-8">
            Welcome Back
          </h2>

          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm">
              {error.error}
            </div>
          )}

          <label
            htmlFor="email"
            className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Email
          </label>
          <div className="relative mb-4">
            <Mail
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ring-offset-2 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>

          <label
            htmlFor="password"
            className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Password
          </label>
          <div className="relative mb-6">
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ring-offset-2 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 active:scale-[0.98] transition duration-200 disabled:opacity-60 disabled:cursor-not-allowed ${
              loading ? "cursor-wait" : ""
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-6">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Register here
            </Link>
          </p>
        </form>
      </div>

      {/* Right - Banner Image */}
      <div className="hidden md:flex items-center justify-center bg-gray-50 dark:bg-gray-800 transition-colors">
        <div className="w-[90%] h-[80%] rounded-xl overflow-hidden shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1531297484001-80022131f5a1"
            alt="Login illustration"
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
