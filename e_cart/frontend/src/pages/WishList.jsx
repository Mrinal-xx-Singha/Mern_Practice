import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../features/products/productSlice";

const WishList = () => {
  const { wishlist } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const handleRemoveFromWishList = (id) => {
    dispatch(removeFromWishlist(id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold uppercase mb-6 text-center text-gray-800">
        Your Wishlist
      </h2>
      {wishlist.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          Your wishlist is empty. Add items to your wishlist to see them here.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div
              key={item._id}
              className="p-4 border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white"
            >
              <div className="w-full h-48 overflow-hidden rounded-md mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {item.name}
              </h3>
              <p className="text-gray-600 text-sm mb-4">₹{item.price}</p>
              <button
                onClick={() => handleRemoveFromWishList(item._id)}
                className="w-full px-4 py-2 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 transition-colors duration-300"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishList;
