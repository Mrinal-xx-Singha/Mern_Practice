// src/components/Navbar.jsx

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/slices/authSlice";
import {
  Clipboard,
  Home,
  Pen,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
    toast.success("Logged out successfully");
  };

  const navLinkClass =
    "flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-gray-100 hover:text-blue-600 transition-all";

  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/feed"
          className="flex items-center gap-2 text-lg font-semibold text-gray-700 hover:text-blue-600 transition"
        >
          <Clipboard size={24} />
          <span>Mrinals Journal</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 text-gray-700">
          <Link to="/feed" className={navLinkClass}>
            <Home size={18} />
            <span>Home</span>
          </Link>

          {user && (
            <>
              <Link to="/create" className={navLinkClass}>
                <Pen size={18} />
                <span>New Post</span>
              </Link>

              <Link to="/profile" className={navLinkClass}>
                <img
                  src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || "User"}`}
                  alt="avatar"
                  className="w-6 h-6 rounded-full border object-cover"
                />
                <span>Profile</span>
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-1 px-3 py-2 text-sm text-red-500 hover:text-red-600 transition"
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
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden px-4 pt-2 pb-4 space-y-2 text-gray-700 text-sm transition-all duration-300 ease-in-out ${
          menuOpen ? "block" : "hidden"
        }`}
      >
        <Link
          to="/feed"
          className={navLinkClass}
          onClick={() => setMenuOpen(false)}
        >
          <Home size={18} />
          <span>Home</span>
        </Link>

        {user && (
          <>
            <Link
              to="/create"
              className={navLinkClass}
              onClick={() => setMenuOpen(false)}
            >
              <Pen size={18} />
              <span>New Post</span>
            </Link>

            <Link
              to="/profile"
              className={navLinkClass}
              onClick={() => setMenuOpen(false)}
            >
              <img
                src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || "User"}`}
                alt="avatar"
                className="w-6 h-6 rounded-full border object-cover"
              />
              <span>Profile</span>
            </Link>

            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-2 text-red-500 hover:text-red-600 transition"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
