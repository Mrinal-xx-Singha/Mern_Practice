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
