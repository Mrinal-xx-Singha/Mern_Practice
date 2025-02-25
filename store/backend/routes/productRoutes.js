import express from "express";
import { protectRoute } from "../middleware/authMiddleware.js";
import { adminRoute } from "../middleware/authMiddleware.js";
import {
  createProduct,
  getAllProducts,
  deleteProduct,
  getProductsByCategory,
  getFeaturedProducts,
  getRecomendedProducts,
  toggleFeaturedProduct
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", protectRoute, adminRoute, getAllProducts);
router.get("/featured", getFeaturedProducts);
router.get("/category/:category", getProductsByCategory);
router.get("/recomendations", getRecomendedProducts);
router.post("/", protectRoute, adminRoute, createProduct);
router.patch("/:id", protectRoute, adminRoute, toggleFeaturedProduct);
router.post("/:id", protectRoute, adminRoute, deleteProduct);

export default router;
