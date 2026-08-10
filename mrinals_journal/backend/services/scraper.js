const axios = require("axios");
const cheerio = require("cheerio");
const Job = require("../models/Job");

const scrapeWWRJobs = async () => {
    try {
        // 1. Fetch the live XML feed from We Work Remotely
        const { data } = await axios.get("https://weworkremotely.com/categories/remote-back-end-programming-jobs.rss", {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36"
            }
        });

        // 2. Load the XML data into Cheerio
        const $ = cheerio.load(data, { xmlMode: true });
        let jobsAdded = 0;

        // 3. Find every <item> which represents a job posting
        const promises = $("item").map(async (i, el) => {
            // WWR puts the company and title together like "Company: Senior Engineer"
            const rawTitle = $(el).find("title").text();
            const applyLink = $(el).find("link").text();
            const description = $(el).find("description").text(); // Includes HTML content

            const splitIndex = rawTitle.indexOf(":");
            const company = splitIndex !== -1 ? rawTitle.substring(0, splitIndex).trim() : "Unknown Company";
            const title = splitIndex !== -1 ? rawTitle.substring(splitIndex + 1).trim() : rawTitle;

            if (title && applyLink) {
                const existingJob = await Job.findOne({ applyLink });

                if (!existingJob) {
                    const newJob = new Job({
                        title,
                        company,
                        location: "Remote",
                        description,
                        isExternal: true,
                        applyLink
                    });
                    await newJob.save();
                    jobsAdded++;
                }
            }
        }).get();

        await Promise.all(promises);

        return { message: "WWR Scraping complete!", newJobsFound: jobsAdded };
    } catch (error) {
        console.error("Scraping error:", error.message);
        throw error;
    }
};

module.exports = { scrapeWWRJobs: scrapeWWRJobs };