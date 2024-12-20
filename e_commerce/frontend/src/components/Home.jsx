import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to Shopify</h1>
      <p className="text-lg mb-6">
        Manage your products and cart with ease. Use the navigation links to get
        started.
      </p>
      <div className="flex justify-center space-x-4">
        <Link
          to="/products"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          View Products
        </Link>
        <Link
          to="/cart"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          View Cart
        </Link>
        <Link
          to="/add-product"
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
        >
          Add a Product
        </Link>
      </div>
    </div>
  );
};

export default Home;
