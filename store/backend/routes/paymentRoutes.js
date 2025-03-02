import express from "express";
import { protectRoute } from "../middleware/authMiddleware.js";
import { createCheckoutSession, verifyPayment } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/create-order", protectRoute, createCheckoutSession);
router.post("/verify-payment", protectRoute, verifyPayment);

export default router;
