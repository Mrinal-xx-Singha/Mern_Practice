require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/user.routes");
const errorHandler = require("./middlewares/error.middleware");

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());

app.use("/api/users", userRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});
