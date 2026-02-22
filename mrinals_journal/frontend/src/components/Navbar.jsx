import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/slices/authSlice";
import { PenLine, User, LogOut, Menu, X } from "lucide-react";
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

  return (
    <nav
      className="sticky top-0 z-50 backdrop-blur-sm"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <div
        className="mx-auto flex items-center justify-between px-6 py-3"
        style={{ maxWidth: "var(--max-width-page)" }}
      >
        {/* Logo */}
        <Link
          to="/feed"
          className="font-serif text-[1.4rem] font-bold tracking-tight"
          style={{ color: "var(--color-text)" }}
        >
          Writely
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-5">
          {user && (
            <>
              <Link
                to="/feed"
                className="link-underline text-sm"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Home
              </Link>
              <Link
                to="/bookmarks"
                className="link-underline text-sm"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Bookmarks
              </Link>

              <Link
                to="/create"
                className="inline-flex items-center gap-1.5 btn-accent"
              >
                <PenLine size={16} />
                Write
              </Link>

              <Link to="/profile" className="flex items-center gap-2 ml-1">
                <img
                  src={
                    user?.avatar ||
                    `https://ui-avatars.com/api/?name=${user?.username || "U"}&background=f0f0f0&color=242424&bold=true&size=128`
                  }
                  alt="avatar"
                  className="w-8 h-8 rounded-full object-cover"
                  style={{ border: "1px solid var(--color-border)" }}
                />
              </Link>

              <button
                onClick={handleLogout}
                className="text-sm transition-colors cursor-pointer"
                style={{ color: "var(--color-text-muted)" }}
                onMouseEnter={(e) =>
                  (e.target.style.color = "var(--color-danger)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.color = "var(--color-text-muted)")
                }
              >
                <LogOut size={18} />
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden"
          style={{ color: "var(--color-text)" }}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-[300px] py-3" : "max-h-0"
        }`}
        style={{
          borderTop: menuOpen ? "1px solid var(--color-border)" : "none",
        }}
      >
        <div className="flex flex-col gap-1 px-6">
          <Link
            to="/feed"
            className="py-2 text-sm"
            style={{ color: "var(--color-text-secondary)" }}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/bookmarks"
            className="py-2 text-sm"
            style={{ color: "var(--color-text-secondary)" }}
            onClick={() => setMenuOpen(false)}
          >
            Bookmarks
          </Link>

          {user && (
            <>
              <Link
                to="/create"
                className="py-2 text-sm font-medium"
                style={{ color: "var(--color-accent)" }}
                onClick={() => setMenuOpen(false)}
              >
                Write a story
              </Link>

              <Link
                to="/profile"
                className="py-2 text-sm flex items-center gap-2"
                style={{ color: "var(--color-text-secondary)" }}
                onClick={() => setMenuOpen(false)}
              >
                <User size={16} />
                Profile
              </Link>

              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="py-2 text-sm text-left flex items-center gap-2"
                style={{ color: "var(--color-danger)" }}
              >
                <LogOut size={16} />
                Sign out
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
