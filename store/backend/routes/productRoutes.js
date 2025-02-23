import express from "express"
import { getAllProducts } from "../controllers/productController.js"
import { protectRoute } from "../middleware/authMiddleware.js"
import { adminRoute } from "../middleware/authMiddleware.js"
import { getFeaturedProducts } from "../controllers/productController.js"

const router = express.Router()

router.get("/",protectRoute,adminRoute,getAllProducts)
router.get("/",protectRoute,adminRoute,getFeaturedProducts)


export default router