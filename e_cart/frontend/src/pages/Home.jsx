import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  fetchProducts,
} from "../features/products/productSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import SortFeature from "../components/SortFeature";
import { Trash, SquarePen, Heart } from "lucide-react";

import { addToWishlist } from "../features/products/productSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [filteredProduct, setFilteredProduct] = useState(products);

  // function to filter product
  function searchProduct(term) {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredProduct(filtered);
  }

  // function to sort products
  function sortProducts(order) {
    const sorted = [...filteredProduct].sort((a, b) => {
      if (order === "asc") return a.price - b.price;
      if (order === "desc") return b.price - a.price;
      return 0;
    });

    setFilteredProduct(sorted);
  }

  // to load the filtered products
  useEffect(() => {
    setFilteredProduct(products);
  }, [products]);

  // to load the products on the home screen
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Function to delete Product
  const handleDeleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
      toast.success("Product deleted successfully");
    }
  };

  // Function to format date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US");
  };

  const handleAddToWishList = (product) => {
    dispatch(addToWishlist(product));
    toast.success(`${product.name}  added to wishlist!`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center uppercase text-gray-800">
        All Products
      </h2>

      {/* Search and sort Feature */}
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <SearchBar searchProduct={searchProduct} />
        <SortFeature sortProducts={sortProducts} />
      </div>

      {/* Display Products */}
      {loading && (
        <p className="text-center font-bold text-gray-500 text-xl">
          Loading Products...
        </p>
      )}
      {error && (
        <p className="text-red-500 text-center font-semibold text-xl">
          {error}
        </p>
      )}
      {!loading && products.length === 0 && (
        <p className="text-center font-bold text-gray-600 text-lg">
          No products available.
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProduct.map((product) => (
          <div
            key={product._id}
            className="p-4 border rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white"
          >
            {/* Product image */}
            <div className="w-full h-44 overflow-hidden rounded-md mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* Product Details */}
            <div className="flex flex-col w-full flex-1 justify-center gap-2 mb-4">
              <h3 className="text-lg font-bold text-gray-800">
                Name: {product.name}
              </h3>
              <p className="text-gray-700 font-semibold">
                <span className="text-orange-500 font-bold">Price:</span> ₹
                {product.price}
              </p>
              <p className="text-sm text-gray-500">
                <span className="text-[#cfb5fc] font-bold">Date:</span>{" "}
                {formatDate(product.updatedAt)}
              </p>
            </div>

            <div className="flex justify-between items-center">
              <Link to={`/update/${product._id}`}>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#386868] text-white font-bold rounded-md hover:bg-[#315c5c] transition-colors duration-200">
                  Update
                  <SquarePen />
                </button>
              </Link>
              {/* Wishlist */}
              <button
                onClick={() => handleAddToWishList(product)}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                <Heart />
              </button>

              <button
                onClick={() => handleDeleteProduct(product._id)}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white font-bold rounded-md hover:bg-red-700 transition-colors duration-200"
              >
                <Trash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
