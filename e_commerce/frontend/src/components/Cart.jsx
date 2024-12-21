import axios from "axios";
import React, { useEffect, useState } from "react";

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/cart")
      .then((response) => setCart(response.data))
      .catch((error) => console.error(error));

      console.log(cart);
      
  }, []);

  const updateQuantity = (id, quantity) => {
    axios
      .put(`http://localhost:3000/api/v1/cart/${id}`, { quantity })
      .then(() => {
        alert("Quantity updated");

        setCart((prev) =>
          prev.map((item) => (item._id === id ? { ...item, quantity } : item))
        );
      })
      .catch((error) => console.error(error));
  };

  const deleteItem = (id) => {
    axios
      .delete(`http://localhost:3000/api/v1/cart/${id}`)
      .then(() => {
        alert("Item deleted");
        setCart((prev) => prev.filter((item) => item._id !== id));
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Your Shopping Cart
      </h2>
      {cart.length > 0 ? (
        cart.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between bg-white p-4 mb-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            {/* Product Info */}
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                <img
                  src={item.productId.image || "placeholder-image-url"}
                  alt={item.productId.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700">
                  {item.productId.name}
                </h3>
                <p className="text-sm text-gray-500">
                  Price: ${item.productId.price}
                </p>
                <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-3">
              <button
                className="bg-green-500 text-white px-3 py-1 rounded-full hover:bg-green-600 transition-transform transform hover:scale-105"
                onClick={() => updateQuantity(item._id, item.quantity + 1)}
              >
                +
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transition-transform transform hover:scale-105"
                onClick={() => deleteItem(item._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 text-lg">
          Your cart is empty. Start adding items!
        </p>
      )}
    </div>
  );
};

export default Cart;
