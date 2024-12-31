import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  fetchProducts,
} from "../features/products/productSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
    console.log(dispatch(fetchProducts()));
  }, [dispatch]);

  // Function to delete Product
  const handleDeleteProduct = (id) => [
    window.confirm("Are you sure you want to delete this product ? ")
      ? dispatch(deleteProduct(id))
      : null,

    toast.success("Product deleted Successfully"),
  ];

  const formatDate = function (date) {
    const formattedDate = new Date(date).toLocaleDateString("en-US");
    return <>{formattedDate}</>;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4 text-center uppercase">
        All Products
      </h2>
      {/* Display Products */}
      {loading && (
        <p className="text-center font-bold text-gray-500 text-xl">
          Loading Products..{" "}
        </p>
      )}
      {error && (
          <p className="text-red-500 text-center font-semibold text-xl">
            {error}
          </p>
        ) &&
        toast.error(error)}

      {!loading && products.length === 0 && (
        <p className="text-center font-bold text-gray-600 text-lg">
          No products available..
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="p-4 border rounded-md shadow-md flex flex-col items-center"
          >
            <div className="w-full h-44 overflow-hidden rounded-md mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform transform hover:scale-110"
              />
            </div>

            <div className="flex flex-col w-full flex-1 justify-center items-baseline gap-3 ">
              <h3 className="text-lg font-bold">Name: {product.name}</h3>
              <p className="text-gray-700 font-bold">
                <span className="text-orange-500 font-bold">Price:</span> ₹{" "}
                {product.price}
              </p>

              <p className="text-sm text-gray-500 mb-2">
                <span className="text-[#cfb5fc] font-bold"> Date:</span>
                {formatDate(product.updatedAt)}
              </p>
            </div>
            <div className="flex justify-between items-center w-full">
              <Link to={`/update/${product._id}`}>
                <button className="mt-2 px-4 py-2 bg-[#386868]  text-white text-bold rounded-md hover:bg-[#315c5c]">
                  Update
                </button>
              </Link>

              <button
                onClick={() => handleDeleteProduct(product._id)}
                className="mt-2
             px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
