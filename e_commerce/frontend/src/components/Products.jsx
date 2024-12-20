import React, { useState, useEffect } from "react";
import axios from "axios";
const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error(error));
  }, []);

  const addToCart = (productId) => {
    axios
      .post(`http://localhost:3000/api/v1/cart`, { productId, quantity: 1 })
      .then(() => alert("Product added to cart"))
      .catch((error) => console.error(error));
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <div className="grid grid-cols-1 md:grdi-cols-2 lg:grid-cols-3 gap-4 rounded">
        {products.map((product) => (
          <div
            key={product._id}
            className="border p-4 rounded shadow hover:shadow-lg"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover justify-center"
            />
            <h3 className="font-bold">{product.name}</h3>
            <p className="font-semibold">{product.description}</p>
            <p className="font-bold text-lg">${product.price}</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 mt-2 rounded hover:bg-blue-600"
              onClick={() => addToCart(product._id)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
