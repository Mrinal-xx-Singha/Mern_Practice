import React, { useState, useEffect } from "react";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [updateData, setUpdateData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });
  const [loading, setLoading] = useState(true);

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/api/v1/products");
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Failed to fetch products");
      setLoading(false);
    }
  };

  // Handle form field changes for editing
  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdateData((prev) => ({ ...prev, [name]: value }));
  };

  // Start editing a product
  const startEditing = (product) => {
    setEditingProduct(product._id);
    setUpdateData({
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
    });
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingProduct(null);
    setUpdateData({
      name: "",
      price: "",
      description: "",
      image: "",
    });
  };

  // Update a product
  const updateProduct = async (productId) => {
    try {
      await axios.put(
        `http://localhost:3000/api/v1/products/${productId}`,
        updateData
      );
      alert("Product updated successfully");
      fetchProducts();
      cancelEditing();
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product");
    }
  };

  // Delete a product
  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/products/${productId}`);
      alert("Product deleted successfully");
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product");
    }
  };

  const addToCart = (productId) => {
    axios
      .post(`http://localhost:3000/api/v1/cart`, { productId, quantity: 1 })
      .then(() => alert("Product added to cart"))
      .catch((error) => console.error(error));
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Products
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-center font-bold text-gray-500 text-lg">
            Loading...
          </p>
        ) : products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow bg-white"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 space-y-2">
                {editingProduct === product._id ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      name="name"
                      value={updateData.name}
                      onChange={handleUpdateChange}
                      placeholder="Name"
                      className="block w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300"
                    />
                    <input
                      type="number"
                      name="price"
                      value={updateData.price}
                      onChange={handleUpdateChange}
                      placeholder="Price"
                      className="block w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300"
                    />
                    <textarea
                      name="description"
                      value={updateData.description}
                      onChange={handleUpdateChange}
                      placeholder="Description"
                      rows="3"
                      className="block w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300"
                    />
                    <input
                      type="text"
                      name="image"
                      value={updateData.image}
                      onChange={handleUpdateChange}
                      placeholder="Image URL"
                      className="block w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300"
                    />
                    <div className="flex justify-between">
                      <button
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        onClick={() => updateProduct(product._id)}
                      >
                        Save
                      </button>
                      <button
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                        onClick={cancelEditing}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {product.description}
                    </p>
                    <p className="font-bold text-xl text-gray-800">
                      ${product.price}
                    </p>
                    <div className="flex justify-between mt-4">
                      <button
                        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                        onClick={() => startEditing(product)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        onClick={() => deleteProduct(product._id)}
                      >
                        Delete
                      </button>
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        onClick={() => addToCart(product._id)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 text-lg">
            No products available.
          </p>
        )}
      </div>
    </div>
  );
};

export default Products;
