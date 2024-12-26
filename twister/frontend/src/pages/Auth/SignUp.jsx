import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();


  const API_BASE_URL = 'http://localhost:5000/api';

  const handleSignUp = async() => {
    try {
      await axios.post(`${API_BASE_URL}/auth/signup`,{name,email,password})
      alert('Signup successfull! Please login.')
      navigate('/login')
    } catch (error) {
      console.error('Error signing up:', error);
      alert('Signup failed');
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border rounded-lg p-2 mb-2
       w-72"
      />
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border rounded-lg p-2 mb-2
       w-72"
      />
      <input
        type="text"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border rounded-lg p-2 mb-2
       w-72"
      />
      <button 
      onClick={handleSignUp}
      className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600">
        Sign Up
      </button>
      <p className="mt-4">
        Already have an account ?{" "}
        <Link to="/login " className=" text-blue-400">
          Login
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
