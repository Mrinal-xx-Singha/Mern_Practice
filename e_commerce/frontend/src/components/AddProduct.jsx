import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3000/api/v1/products", productData)
      .then((response) => {
        alert("Product added successfully");
        setProductData({
          name: "",
          price: "",
          description: "",
          image: "",
        });
      })
      .catch((error) => {
        console.error("Error adding product:", error);
        alert("Failed to add product. Please try again.");
      });
  };

  return (
    <div className="min-h-screen max-w-2xl mx-auto  flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-gray-600 mb-6 text-center">
          Add New Product
        </h2>
        <form onSubmit={handleSubmit} className="space-x-0  m-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600"
            >
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={productData.name}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter product name"
              required
            />
          </div>

          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-600"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={productData.price}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter product price"
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-600"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={productData.description}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter product description"
              rows="4"
              required
            />
          </div>

          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-600"
            >
              Image URL
            </label>
            <input
              type="text"
              id="image"
              name="image"
              value={productData.image}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter image URL"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
