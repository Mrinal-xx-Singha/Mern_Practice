const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { scrapeWWRJobs } = require("./services/scraper");
dotenv.config();

const testScraper = async () => {
  try {
    console.log("Connecting to Database...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected!");

    console.log("Starting Web Scraper...");
    const result = await scrapeWWRJobs();

    console.log("\n✅ SUCCESS!");
    console.log(result);

    process.exit(0);
  } catch (error) {
    console.error("❌ ERROR:", error);
    process.exit(1);
  }
};

testScraper();
