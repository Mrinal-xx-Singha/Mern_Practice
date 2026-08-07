// backend/seed.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const Post = require("./models/Post");
const Comment = require("./models/Comment");

// Load env vars
dotenv.config();

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected for Seeding"))
    .catch((err) => {
        console.error("❌ MongoDB Connection Error:", err);
        process.exit(1);
    });

const seedData = async () => {
    try {
        // 1. Check existing demo users to avoid duplicates instead of wiping the database
    console.log("🔍 Checking for existing demo users...");
    const existingAdmin = await User.findOne({ email: "admin@example.com" });
    if (existingAdmin) {
      console.log("⏭️ Demo users already exist. Skipping seed to protect your existing data!");
      process.exit();
    }

        // 2. Hash passwords for mock users
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("password123", salt);

        // 3. Create Sample Users (including our Demo accounts from Step 1)
        console.log("👤 Creating users...");
        const users = await User.insertMany([
            {
                username: "DemoAdmin",
                email: "admin@example.com",
                password: hashedPassword,
                role: "admin",
                bio: "Senior System Architect & Full-Stack Developer.",
                avatar: "https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff&size=128",
            },
            {
                username: "DemoUser",
                email: "demo@example.com",
                password: hashedPassword,
                role: "user",
                bio: "Enthusiastic developer learning the MERN stack.",
                avatar: "https://ui-avatars.com/api/?name=Demo&background=22c55e&color=fff&size=128",
            },
            {
                username: "TechGuru",
                email: "guru@example.com",
                password: hashedPassword,
                role: "user",
                bio: "Writing about AI, React, and high-performance backend systems.",
                avatar: "https://ui-avatars.com/api/?name=Guru&background=ef4444&color=fff&size=128",
            }
        ]);

        const adminId = users[0]._id;
        const guruId = users[2]._id;

        // 4. Create Realistic Sample Posts using Markdown
        console.log("📝 Creating posts...");
        const posts = await Post.insertMany([
            {
                title: "Mastering React Server Components in 2026",
                content: "React Server Components (RSC) fundamentally change how we build React applications. \n\n## Why RSC? \n\nInstead of fetching data on the client and triggering multiple re-renders, Server Components fetch data on the server and stream UI directly to the client.\n\n```javascript\n// An example of a Server Component\nexport default async function Dashboard() {\n  const data = await fetchDatabaseData();\n  return <div>{data.title}</div>;\n}\n```\n\nBy keeping heavy dependencies on the server, we drastically reduce our JavaScript bundle size!",
                tags: ["React", "Performance", "Frontend"],
                category: "Engineering",
                author: guruId,
                views: 1250,
            },
            {
                title: "How I Built an AI-Powered Copilot using Node.js",
                content: "Building an AI copilot isn't just about calling an API; it's about handling asynchronous workloads, maintaining context, and ensuring low latency.\n\n### The Architecture\n\nWe utilized **Node.js** with an event-driven architecture to stream responses back to the client using WebSockets.\n\n> \"Latency is the enemy of a good AI experience. Streaming responses chunk-by-chunk is non-negotiable.\" \n\nI highly recommend using MongoDB for storing chat histories because its document model fits conversational structures perfectly.",
                tags: ["AI", "Node.js", "Backend"],
                category: "System Design",
                author: adminId,
                views: 3400,
            }
        ]);

        console.log("🎉 Database Successfully Seeded!");
        process.exit();
    } catch (error) {
        console.error("❌ Error Seeding Data:", error);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        console.log("💥 Destroying all data...");
        await User.deleteMany();
        await Post.deleteMany();
        await Comment.deleteMany();
        console.log("🗑️ Database Cleared!");
        process.exit();
    } catch (error) {
        console.error("❌ Error Destroying Data:", error);
        process.exit(1);
    }
};

// Check command line arguments: if "-d", run destroyData, else run seedData
if (process.argv[2] === "-d") {
    destroyData();
} else {
    seedData();
}