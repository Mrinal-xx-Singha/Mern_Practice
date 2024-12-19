import express from "express";
import {
  createProducts,
  getProducts,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/products", getProducts);

router.post("/products", createProducts);

export default router;
