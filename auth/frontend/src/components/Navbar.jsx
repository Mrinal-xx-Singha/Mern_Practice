// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/slices/authSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b shadow-sm py-4 px-6 mb-6">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <Link to="/" className="text-xl font-bold text-gray-600 uppercase tracking-wider">
          Mrinals Journal
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          {user && (
            <>
              <Link to="/create" className="hover:underline">
                New Post
              </Link>
              <span className="text-gray-600">|</span>
              <button
                onClick={handleLogout}
                className="text-red-500 hover:underline"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
