import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUser,
  clearAuthError,
  clearRegistered,
} from "../redux/slices/authSlice";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Mail, Lock, User } from "lucide-react";

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
        toast.success("🎉 User Registered Successfully!");
      })
      .catch(() => {
        toast.error("❌ Registration failed. Please try again.");
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 px-4 transition-colors duration-300">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-8 "
      >
        <h2 className="text-3xl font-semibold text-center text-blue-700 dark:text-blue-400 mb-8">
          Create an Account
        </h2>

        {error && (
          <p className="bg-red-100 text-red-700 px-4 py-2 rounded text-sm mb-4 text-center">
            {error}
          </p>
        )}

        <div className="space-y-4">
          {/* Username */}
          <div className="relative">
            <User
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ring-offset-2 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>
          {/* Email */}
          <div className="relative">
            <Mail
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ring-offset-2 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>
          {/* Password */}
          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ring-offset-2 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-600 text-white py-2 mt-6 rounded-lg font-semibold hover:bg-blue-700 active:scale-[0.98] transition duration-200 disabled:opacity-60 disabled:cursor-not-allowed ${
            loading ? "cursor-wait" : ""
          }`}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="mt-6 text-sm text-gray-600 dark:text-gray-400 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
