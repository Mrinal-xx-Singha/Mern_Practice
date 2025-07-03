import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slices/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg w-full max-w-md p-8 animate-fade-in"
      >
        <h2 className="text-3xl font-semibold text-center text-green-700 mb-6 tracking-wide">
          Login to Your Account
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm">
            {error.error}
          </div>
        )}

        <label className="block mb-2 text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400 transition"
        />

        <label className="block mt-4 mb-2 text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400 transition"
        />

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 active:scale-[0.98] transition duration-200"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-sm text-center text-gray-500 mt-6">
          Don’t have an account?{" "}
          <a href="/register" className="text-green-600 hover:underline">
            Register here
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
