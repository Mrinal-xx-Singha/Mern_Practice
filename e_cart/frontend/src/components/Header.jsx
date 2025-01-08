import React from "react";
import { Link } from "react-router-dom";
import { Plus, Heart, ShoppingBagIcon } from "lucide-react";

const Header = () => {
  return (
    <nav className="container mx-auto px-4 py-3 shadow-md bg-white dark:bg-gray-900 w-full">
      <div className="flex items-center justify-between">
        {/* Logo Section */}
        <Link to="/">
          <h1 className="sm:text-xl  md:text-3xl font-extrabold tracking-wide text-[#18568f] dark:text-[#0b3963] uppercase">
            Swift Cart
          </h1>
        </Link>

        {/* Action Button Section */}
        <div className="flex items-center gap-4">
          <Link to="/create">
            <button className="flex items-center gap-2 px-4 py-2 text-white bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 rounded-lg shadow-md transition-all">
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Add Item</span>
            </button>
          </Link>

          {/* WishList */}
          <Link to="/wishlist">
            <button className="flex items-center gap-2 px-4 py-2 text-black bg-gray-100  rounded-lg transition-all">
              <Heart />
            </button>
          </Link>

          {/* Cart */}
          <Link to="/cart">
            <button
              className="flex items-center gap-2 px-4 py-2
           text-white bg-gray-700 rounded-lg transition-all"
            >
              <ShoppingBagIcon />
              <span className="hidden sm:inline">Cart</span>
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
