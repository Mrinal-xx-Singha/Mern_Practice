import express from "express";
import {
  createProducts,
  getProducts,
  deleteProduct,
  updateProduct
} from "../controllers/productController.js";

const router = express.Router();

router.get("/products", getProducts);

router.post("/products", createProducts);

router.put("/products/:id", updateProduct);

router.delete("/products/:id", deleteProduct);
export default router;
