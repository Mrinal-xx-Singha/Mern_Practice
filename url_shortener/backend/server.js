const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const urlRoutes = require("./routes/urlRoutes");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
dotenv.config();

const app = express();

// Security Middleware
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);
app.use(morgan("dev"));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);
app.use(express.json());

app.use("/", urlRoutes);

app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`Server is running on ${process.env.PORT}`);
});
