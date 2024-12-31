import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchProducts,
  updateProduct,
} from "../features/products/productSlice";
import toast from "react-hot-toast";

const UpdateProduct = () => {
  const { id } = useParams(); // Get product ID from the route
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading } = useSelector((state) => state.products);

  const [productData, setProductData] = useState({
    name: "",
    price: "",
    image: "",
  });

  // Load product data for the given ID
  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    } else {
      const product = products.find((p) => p._id === id);
      if (product) {
        setProductData({
          name: product.name,
          price: product.price,
          image: product.image,
        });
      }
    }
  }, [id, products, dispatch]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle product update
  const handleUpdateProduct = () => {
    if (!productData.name || !productData.price || !productData.image) {
      toast.error("Please fill all fields!");
      return;
    }
    dispatch(updateProduct({ id, updatedData: productData }))
      .unwrap()
      .then(() => {
        toast.success("Product updated successfully!");
        navigate("/");
      })
      .catch((error) => toast.error(error));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6 uppercase">
        Update Product
      </h1>
      <div className="max-w-lg mx-auto">
        <label className="text-lg font-bold text-[#386868] m-2">Name</label>
        <input
          type="text"
          name="name"
          value={productData.name}
          onChange={handleInputChange}
          placeholder="Product Name"
          className="w-full p-2 mb-4 border rounded-md"
        />
        <label className="text-lg font-bold text-[#386868] m-2">Price</label>
        <input
          type="number"
          name="price"
          value={productData.price}
          onChange={handleInputChange}
          placeholder="Product Price"
          className="w-full p-2 mb-4 border rounded-md"
        />
        <label className="text-lg font-bold text-[#386868] m-2">Image</label>
        <input
          type="text"
          name="image"
          value={productData.image}
          onChange={handleInputChange}
          placeholder="Image URL"
          className="w-full p-2 mb-4 border rounded-md"
        />
        <button
          onClick={handleUpdateProduct}
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
        >
          Update Product
        </button>
      </div>
    </div>
  );
};

export default UpdateProduct;
