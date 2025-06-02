import axios from "../axios";
import { useState } from "react";

const Register = () => {
  const [form, setForm] = useState({ email: "", passowrd: "" });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post("/register", form);
      console.log(res.data)
      alert(res.data.message);
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-96 "
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Register
        </h2>
        <input
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          name="email"
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="Password"
        />

        <button
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
