import Product from "../models/productModel.js";
import cloudinary from "../utils/cloudinary.js";
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

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, image, category } = req.body;

    let cloudinaryResponse = null;

    if (image) {
      cloudinaryResponse = await cloudinary.uploader.upload(image, {
        folder: "products",
      });
    }

    const product = await Product.create({
      name,
      description,
      price,
      image: cloudinaryResponse?.secure_url
        ? cloudinaryResponse.secure_url
        : "",
      category,
    });

    res.status(201).json({ message: "Product created", product });
  } catch (error) {
    console.log("Error in createProduct controller", error.message);
    res.status(400).json({ message: "Server Error", error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById({ id });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.image) {
      // this will get the id of image to delete it
      const publicId = product.image.split("/").pop().split(".")[0];

      try {
        await cloudinary.uploader.destroy(`products/${publicId}`);
        console.log("Deleted Image from cloudinary");
      } catch (error) {
        console.log("Error deleting image from cloudinary", error);
      }
    }

    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully " });
  } catch (error) {
    console.log("Error in deleteProduct controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getRecomendedProducts = async (req, res) => {
  try {
    // agregate pipeline in mongoose
    const products = await Product.aggregate([
      {
        $sample: { size: 3 },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          image: 1,
          price: 1,
        },
      },
    ]);

    res.json(products);
  } catch (error) {
    console.log("Error in getRecommendedProducts controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getProductsByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const products = await Product.find({ category });
    res.json(products);
  } catch (error) {
    console.log("Error in getProductsByCategory", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// we toggle the state featured flag
export const toggleFeaturedProduct = async (req, res) => {
  let id = req.params.id;
  try {
    const product = await findById(id);
    if (product) {
      product.isFeatured = !product.isFeatured;
      const updatedProduct = await product.save();
      await updateFeaturedProductsCache();

      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.log("Error in toggleFeaturedProduct controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

async function updateFeaturedProductsCache() {
  try {
    // The lean method is used to return plain js object insted of full mongoose documents. This can significantly improve performance

    const featuredProducts = await Product.find({ isFeatured: true }).lean();
    await redis.set("featured_products", JSON.stringify(featuredProducts));
  } catch (error) {
    console.log("Error in updateCache function");
  }
}
