import React from "react";
import { Link } from "react-router-dom";

const Header = ({ token,handleLogout }) => {
    
  return (
    <header className="bg-gray-400 text-white py-4 px-8 flex justify-between items-center">
      <h1 className="text-3xl font-bold">TWISTER</h1>
      <nav>
        <Link to="/" className="mr-4 hover:underline">
          Home
        </Link>
        {token ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 py-1 px-4 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="mr-4 hover:underline">
              Login
            </Link>
            <Link to="/signup" className="mr-4 hover:underline">
              Signup
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
