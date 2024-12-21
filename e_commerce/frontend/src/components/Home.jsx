import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the API
    axios
      .get("http://localhost:3000/api/v1/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-6">
          Welcome to QuickCart
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Manage your products and cart with ease. Use the navigation links to
          get started.
        </p>

        <div className="flex justify-center space-x-4 mb-10">
          <Link
            to="/products"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            View Products
          </Link>
          <Link
            to="/cart"
            className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600 transition"
          >
            View Cart
          </Link>
          <Link
            to="/add-product"
            className="bg-purple-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-purple-600 transition"
          >
            Add a Product
          </Link>
        </div>

        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Featured Products
        </h2>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white shadow-md rounded-lg overflow-hidden"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {product.description}
                  </p>
                  <p className="text-lg font-semibold text-blue-600">
                    ${product.price}
                  </p>
                </div>
                <div className="p-4 border-t">
                  <Link
                    to={`/products/${product.id}`}
                    className="text-blue-500 font-medium hover:underline"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No products available. Add some!</p>
        )}
      </div>
    </div>
  );
};

export default Home;
