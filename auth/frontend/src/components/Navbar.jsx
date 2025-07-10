// src/components/Navbar.jsx

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/slices/authSlice";
import { Clipboard, Home, Pen, User, LogOut, Menu } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-6xl mx-auto px-4 py-3">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-lg sm:text-xl font-semibold text-gray-700 tracking-wide hover:text-blue-600 transition"
        >
          <Clipboard size={24} />
          <span>Mrinals Journal</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 text-gray-700 text-sm">
          <Link
            to="/"
            className="flex items-center gap-1 hover:text-blue-600 transition"
          >
            <Home size={18} />
            <span>Home</span>
          </Link>

          {user && (
            <>
              <Link
                to="/create"
                className="flex items-center gap-1 hover:text-blue-600 transition"
              >
                <Pen size={18} />
                <span>New Post</span>
              </Link>

              <Link
                to="/profile"
                className="flex items-center gap-2 hover:text-blue-600 transition"
              >
                <img
                  src={user?.avatar || "https://ui-avatars.com/api/?name=Userg"}
                  alt="avatar"
                  className="w-6 h-6 rounded-full object-cover border"
                />
                <span>Profile</span>
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-red-500 hover:text-red-600 transition"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-700 hover:text-blue-600 transition"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex mt-2 flex-col gap-4 px-4 pb-4 text-gray-700 text-sm border-t">
          <Link
            to="/"
            className="flex items-center gap-2 pt-2 hover:text-blue-600 transition"
            onClick={() => setMenuOpen(false)}
          >
            <Home size={18} />
            <span>Home</span>
          </Link>

          {user && (
            <>
              <Link
                to="/create"
                className="flex items-center gap-2 hover:text-blue-600 transition"
                onClick={() => setMenuOpen(false)}
              >
                <Pen size={18} />
                <span>New Post</span>
              </Link>
              <Link
                to="/profile"
                className="flex items-center gap-2 hover:text-blue-600 transition"
                onClick={() => setMenuOpen(false)}
              >
                <img
                  src={user?.avatar || "https://ui-avatars.com/api/?name=User"}
                  alt="avatar"
                  className="w-6 h-6 rounded-full object-cover border"
                />
                <span>Profile</span>
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="flex items-center gap-2 text-red-500 hover:text-red-600 transition"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
