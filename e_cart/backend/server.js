import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import productRoutes from "./routes/productRoute.js"

dotenv.config();

const app = express();
app.use(express.json());


app.use('/api/products',productRoutes)


app.listen(5000, () => {
  console.log("Server is Running on Port ");
  connectDb();
});
