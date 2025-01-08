import React from "react";
import {
  removeFromCart,
  updateQuantity,
} from "../features/products/productSlice";
import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
  const dispatch = useDispatch();
  const { cart, totalCost } = useSelector((state) => state.products);

  const handleQuantityChange = (id, quantity) => {
    return dispatch(updateQuantity({ id, quantity: parseInt(quantity) }));
  };

  console.log(cart);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4 text-center uppercase">
        Your Cart
      </h2>
      {cart.length === 0 ? (
        <p className="text-center font-semibold text-gray-500">
          Your Cart is Empty
        </p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center p-4 border rounded-md "
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div>
                  <h3 className="text-lg font-bold">Name: {item.name}</h3>
                  <p className="text-sm text-gray-600">Price: ₹{item.price}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item._id, e.target.value)
                  }
                  className="border w-16 text-center"
                />
                <button
                  onClick={() => dispatch(removeFromCart(item._id))}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div
            className="text-right text-xl
             font-bold"
          >
            Total Cost: ₹{totalCost}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
