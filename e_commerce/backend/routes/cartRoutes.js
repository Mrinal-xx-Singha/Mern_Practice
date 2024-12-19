import express from "express";
import {
  getCartItems,
  addToCart,
  updateCartItem,
  deleteCartItem,
} from "../controllers/cartController.js";

const router = express.Router();

router.get("/cart", getCartItems);

router.post("/cart", addToCart);

router.put("/cart/:id", updateCartItem);

router.delete("/cart/:id", deleteCartItem);

export default router;
