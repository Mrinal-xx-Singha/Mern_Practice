import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios.js";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/register", formData);
      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.error || "Registration failed");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form className="bg-white p-8 rounded shadow-md w-full max-w-md"
      
      onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-2 mb-3 border rounded "
          placeholder="Name"
          type="text"
        />
        <input
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full p-2 mb-3 border rounded "
          placeholder="Email"
          type="email"
        />
        <input
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          className="w-full p-2 mb-3 border rounded "
          placeholder="Password"
          type="password"
        />
        <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
