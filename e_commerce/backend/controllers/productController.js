import Product from "../models/Product.js";

// Getting all products

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.log("Error in gettingAllProductsController:", error);

    res.status(500).json({ message: "Error fetching products" });
  }
};

// creating a new Product
export const createProducts = async (req, res) => {
  const { name, price, description, image } = req.body;

  try {
    const newProduct = new Product({ name, price, description, image });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: "Error creating product" });
  }
};

// Updating an existing product

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, description, image } = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, price, description, image },
      { name: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error in updateProduct:", error);
    res.status(500).json({ message: "Error updating product" });
  }
};

// Deleting a product

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error in deleteProduct:", error);
    res.status(500).json({ message: "Error deleting product" });
  }
};
