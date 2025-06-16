import React, { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios.js";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/login", formData);
      localStorage.setItem("token", res.data.token);
      login({ email: formData.email });
      navigate("/profile");
    } catch (error) {
      setError(error.response?.data?.error || "Login Failed");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input
          type="Email"
          className="w-full p-2 mb-3 border rounded"
          placeholder="Email"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="Password"
          className="w-full p-2 mb-3 border rounded"
          placeholder="Password"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <button
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 "
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
