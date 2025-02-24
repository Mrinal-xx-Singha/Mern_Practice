import express from "express";
import { createProduct, getAllProducts } from "../controllers/productController.js";
import { protectRoute } from "../middleware/authMiddleware.js";
import { adminRoute } from "../middleware/authMiddleware.js";
import { getFeaturedProducts } from "../controllers/productController.js";


const router = express.Router();

router.get("/", protectRoute, adminRoute, getAllProducts);
router.get("/featured", getFeaturedProducts);
router.post("/product", protectRoute, adminRoute, createProduct);

export default router;
