import Product from "../models/productModel.js";
import { redis } from "../utils/redis.js";


export const getAllProducts = async (req, res) => {
  try {
    // Empty filter find all products
    const products = await Product.find({});
    res.status(200).json({ products });
  } catch (error) {
    res.status(400).json({ message: "Error in getAllProduct Controller" });
  }
};


export const getFeaturedProducts = async (req, res) => {
  try {
    let featuredProducts = await redis.get("featured_products");

    if (featuredProducts) {
      return res.json(JSON.parse(featuredProducts));
    }
    // if it is not in redis, fetch from mongodb
    // .lean() returns a js object insted of mongodb document which is good for performance

    featuredProducts = await Product.find({ isFeatured: true }).lean();

    if (!featuredProducts) {
      return res.status(404).json({ message: "No featured products found" });
    }

    // Store in redis for future quick access

    await redis.set("featured_products", JSON.stringify(featuredProducts));

    res.status(200).json(featuredProducts);
  } catch (error) {
    console.log("Error in getFeaturedProducts controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const createProduct = async(req,res) =>{
  try {
    
  } catch (error) {
    
  }
}