import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/slices/authSlice";
import { Clipboard, Home, Pen, User, LogOut, Menu, X } from "lucide-react";
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
    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 hover:text-blue-600 transition-all";

  return (
    <nav className="bg-white border-b shadow-md sticky top-0 z-50 transition-shadow">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/feed"
          className="flex items-center gap-2 text-xl font-bold text-gray-800 hover:text-blue-600 transition uppercase"
        >
          <Clipboard size={24} />
          <span>Mrinals Journal</span>
        </Link>

        {/* Desktop Navigation */}
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

              <Link to="/profile" className={`${navLinkClass} group`}>
                <div className="relative flex items-center gap-2">
                  <img
                    src={
                      user?.avatar ||
                      `https://ui-avatars.com/api/?name=${user?.name || "User"}`
                    }
                    alt="avatar"
                    className="w-7 h-7 rounded-full border object-cover"
                  />
                  <span>{user?.name?.split(" ")[0]}</span>
                </div>
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-500 hover:text-red-600 transition"
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

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden overflow-hidden px-4 transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-[300px] py-2" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-3 text-gray-700 text-sm">
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
                  src={
                    user?.avatar ||
                    `https://ui-avatars.com/api/?name=${user?.name || "User"}`
                  }
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
      </div>
    </nav>
  );
};

export default Navbar;
