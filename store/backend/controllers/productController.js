import Product from "../models/productModel.js";
export const getAllProducts = async (req, res) => {
  try {
    // Empty filter find all products
    const products = await Product.find({});
    res.status(200).json({ products });
  } catch (error) {
    res.status(400).json({ message: "Error in getAllProduct Controller" });
  }
};


export const getFeaturedProducts  = async(req,res) =>{
    try {
        
        
    } catch (error) {
        
    }

}