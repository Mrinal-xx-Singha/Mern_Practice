import React from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

const Header = () => {
  return (
    <nav className="container mx-auto px-4 py-3 shadow-md bg-white dark:bg-gray-900 w-full">
      <div className="flex items-center justify-between">
        {/* Logo Section */}
        <Link to="/">
          <h1 className="text-3xl font-extrabold tracking-wide text-[#18568f] dark:text-[#0b3963] uppercase">
            Swift Cart
          </h1>
        </Link>

        {/* Action Button Section */}
        <div className="flex items-center gap-4">
          <Link to="/create">
            <button className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg shadow-md transition-all">
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Add Item</span>
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
