import React from "react";
import Register from "./components/Register";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./components/Login";
const App = () => {
  return (
    <Router>
      <nav className="bg-gray-800 p-4 text-white flex justify-center space-x-4">
        <div className="flex justify-between w-full items-center">
          <h1 className="text-3xl font-bold uppercase tracking-wider">Poster</h1>
          <div className="flex-end flex gap-2" >

          <Link to="/">Login</Link> | <Link to="/register">Register</Link>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
