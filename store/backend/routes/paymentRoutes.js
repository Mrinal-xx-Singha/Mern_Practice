import express from "express"
import { protectRoute } from "../middleware/authMiddleware.js"
import { createCheckoutSession } from "../controllers/paymentController.js"

const router = express.Router()

router.post("/create-checkout-session",protectRoute,createCheckoutSession)


export default router