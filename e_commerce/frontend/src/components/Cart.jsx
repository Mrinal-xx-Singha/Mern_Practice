import axios from "axios";
import React, { useEffect, useState } from "react";

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/cart")
      .then((response) => setCart(response.data))
      .catch((error) => console.error(error));
  }, []);

  const updateQuantity = (id, quantity) => {
    axios
      .put(`http://localhost:3000/api/v1/cart/${id}`, {quantity})
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
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Cart</h2>
      {cart.map((item) => (
        <div
          key={item._id}
          className="border p-4 mb-4 rounded shadow flex justify-between items-center hover:shadow-lg"
        >
          <div>
            <h3>{item.productId.name}</h3>
            <p>Quantity: {item.quantity}</p>
          </div>
          <div>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 "
              onClick={() => updateQuantity(item._id, item.quantity + 1)}
            >
              +
            </button>
            <button
              className="bg-red-500 text-white px-2 py-1 rounded ml-2"
              onClick={() => deleteItem(item._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cart;
