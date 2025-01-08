import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  deleteProduct,
  fetchProducts,
} from "../features/products/productSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import SortFeature from "../components/SortFeature";
import { Trash, SquarePen, Heart, ShoppingCart } from "lucide-react";

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

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="container mx-auto px-4 py-2">
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
            className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-white m-4"
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
            <div className="flex flex-col justify-center gap-3 mb-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h3>
                {/* Wishlist */}
                <button
                  onClick={() => handleAddToWishList(product)}
                  className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700"
                >
                  <Heart />
                </button>
              </div>

              <p className="text-gray-700 font-medium">
                <span className="text-orange-500 font-bold">Price:</span> ₹
                {product.price}
              </p>
              <p className="text-sm text-gray-500">
                <span className="text-[#cfb5fc] font-bold">Date:</span>{" "}
                {formatDate(product.updatedAt)}
              </p>
            </div>

            <div
              className="flex justify-between items-center gap-2
            "
            >
              <button
                onClick={() => handleAddToCart(product)}
                className="px-4 py-2  bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700 transition-all"
              >
                <ShoppingCart />
              </button>
              <Link to={`/update/${product._id}`}>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#386868] text-white text-sm font-medium rounded-md hover:bg-[#315c5c] transition-colors duration-200">
                  Update
                  <SquarePen />
                </button>
              </Link>
              <button
                onClick={() => handleDeleteProduct(product._id)}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition-colors duration-200"
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
