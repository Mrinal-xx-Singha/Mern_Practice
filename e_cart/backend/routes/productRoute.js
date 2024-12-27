import express from "express";
import {
  deleteProducts,
  getAllProducts,
  updateProducts,
  createProducts,
} from "../controllers/productController.js";

const router = express.Router();

//Create a product route
router.post("/", createProducts);
//Delete a product route
router.delete("/:id", deleteProducts);
//Get all product route
router.get("/", getAllProducts);
// Update a product route
router.put("/:id", updateProducts);

export default router;
