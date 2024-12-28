import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import productRoutes from "./routes/productRoute.js";

dotenv.config();
const PORT = process.env.PORT;
const app = express();
app.use(express.json());

app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Server is Running on ${PORT}`);
  connectDb();
});
