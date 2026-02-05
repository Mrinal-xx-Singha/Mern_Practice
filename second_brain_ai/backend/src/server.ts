import app from "./app";
import { ENV } from "./config/env";
import { connectDB } from "./config/db";

const startServer = async () => {
  await connectDB();

  app.listen(ENV.PORT, () => {
    console.log(`🚀 Server is running on port ${ENV.PORT}`);
  });
};

startServer();
