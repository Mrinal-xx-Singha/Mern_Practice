import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="bg-[#1f1e1d] text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-yellow-400">
          QuickCart
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/"
            className="hover:text-yellow-400 transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="hover:text-yellow-400 transition-colors duration-200"
          >
            Products
          </Link>
          <Link
            to="/cart"
            className="hover:text-yellow-400 transition-colors duration-200"
          >
            Cart
          </Link>
          <Link
            to="/add-product"
            className="hover:text-yellow-400 transition-colors duration-200"
          >
            Add Product
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <button
            className="focus:outline-none hover:text-yellow-400"
            aria-label="Open Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
