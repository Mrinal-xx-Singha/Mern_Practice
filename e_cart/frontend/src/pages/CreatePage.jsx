import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { createProduct } from "../features/products/productSlice.js";
import { Navigate, useNavigate } from "react-router-dom";

const CreatePage = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.products);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  // Navigate to home page after product is created
  const navigate = useNavigate();

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      toast.error("Please fill all fields");
      return;
    }

    dispatch(createProduct(newProduct))
      ? toast.success("Product added successfully")
      : null;
    setNewProduct({ name: "", price: "", image: "" });
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 h-[90vh]">
      <div className="w-full max-w-lg  p-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl ">
        <h1 className="text-2xl font-extrabold text-center text-gray-800 dark:text-gray-100 mb-6  uppercase">
          Add a New Product
        </h1>
        <form className="sm:space-y-4 md:space-y-5 lg:space-y-6 " onSubmit={(e) => e.preventDefault()}>
          {/* Product Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              placeholder="Enter product name"
              className="mt-2 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-500 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-400"
            />
          </div>
          {/* Price */}
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              placeholder="Enter price"
              className="mt-2 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-500 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-400"
            />
          </div>
          {/* Product Image */}
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Product Image URL
            </label>
            <input
              type="text"
              id="image"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
              placeholder="Enter image URL"
              className="mt-2 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-500 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-400"
            />
          </div>
        </form>
        {/* Submit Button */}
        <button
          type="button"
          className="w-full mt-4 py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600 transition-all"
          onClick={handleAddProduct}
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
        {error && <p className="text-center text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default CreatePage;
