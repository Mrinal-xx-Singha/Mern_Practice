import mongoose from "mongoose";
import Product from "../model/product.js";

// Create Products
export const createProducts = async (req, res) => {
  const product = req.body; // user will send the data
  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }
  const newProduct = new Product(product);
  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error in createProduct:", error.messaege);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Delete Products
export const deleteProducts = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.error("Error in Deleteing Product", error.message);
    res.status(404).json({ success: false, message: "Product not found!" });
  }
};

// Get all Products controller
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("error in fetching products:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Update controller
export const updateProducts = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product Id" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.error("error in updating product", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
