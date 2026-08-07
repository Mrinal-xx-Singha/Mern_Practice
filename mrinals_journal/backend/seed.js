const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const Post = require("./models/Post");
const Comment = require("./models/Comment");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected for Seeding"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });

const seedData = async () => {
  try {
    console.log("🗑️ Clearing existing data to generate exactly 20 users and 5 posts...");
    await User.deleteMany();
    await Post.deleteMany();
    await Comment.deleteMany();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("password123", salt);

    console.log("👤 Creating 20 users...");
    
    // Core Demo Users
    const usersData = [
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
      }
    ];

    // Procedural generation of 18 more users
    const roles = ["Software Engineer", "Frontend Developer", "Backend Engineer", "Data Scientist", "UI/UX Designer", "DevOps Engineer", "Cloud Architect"];
    for(let i = 1; i <= 18; i++) {
        const roleStr = roles[i % roles.length];
        usersData.push({
            username: `TechUser${i}`,
            email: `techuser${i}@example.com`,
            password: hashedPassword,
            role: "user",
            bio: `Passionate ${roleStr}. Always learning and building.`,
            avatar: `https://ui-avatars.com/api/?name=Tech+User${i}&background=random&color=fff&size=128`,
        });
    }

    const insertedUsers = await User.insertMany(usersData);
    const authorIds = [insertedUsers[0]._id, insertedUsers[1]._id, insertedUsers[2]._id, insertedUsers[3]._id, insertedUsers[4]._id];

    console.log("📝 Creating 5 rich Markdown posts...");
    const postsData = [
      {
        title: "Mastering React Server Components in 2026",
        content: "React Server Components (RSC) fundamentally change how we build React applications. \n\n## Why RSC? \n\nInstead of fetching data on the client and triggering multiple re-renders, Server Components fetch data on the server and stream UI directly to the client.\n\n```javascript\n// An example of a Server Component\nexport default async function Dashboard() {\n  const data = await fetchDatabaseData();\n  return <div>{data.title}</div>;\n}\n```\n\nBy keeping heavy dependencies on the server, we drastically reduce our JavaScript bundle size!",
        tags: ["React", "Performance", "Frontend"],
        category: "Engineering",
        author: authorIds[0],
        views: 1250,
      },
      {
        title: "How I Built an AI-Powered Copilot using Node.js",
        content: "Building an AI copilot isn't just about calling an API; it's about handling asynchronous workloads, maintaining context, and ensuring low latency.\n\n### The Architecture\n\nWe utilized **Node.js** with an event-driven architecture to stream responses back to the client using WebSockets.\n\n> \"Latency is the enemy of a good AI experience. Streaming responses chunk-by-chunk is non-negotiable.\" \n\nI highly recommend using MongoDB for storing chat histories because its document model fits conversational structures perfectly.",
        tags: ["AI", "Node.js", "Backend"],
        category: "System Design",
        author: authorIds[1],
        views: 3400,
      },
      {
        title: "CSS Architecture for Modern Web Apps",
        content: "CSS has evolved massively. From CSS Modules to Tailwind CSS v4, the tools we have now are incredibly powerful.\n\n## The Rise of Utility-First\nUtility-first CSS allows developers to build components without leaving their HTML. However, maintaining large codebases requires discipline.\n\n### Best Practices:\n- Use CSS variables for theming\n- Avoid deep nesting\n- Use utility classes for layout, but semantic classes for typography.",
        tags: ["CSS", "Design", "Frontend"],
        category: "UI/UX",
        author: authorIds[2],
        views: 890,
      },
      {
        title: "Understanding MongoDB Aggregation Pipelines",
        content: "Aggregation pipelines are one of MongoDB's most powerful features. They allow you to process data records and return computed results.\n\n```javascript\n// Example Pipeline\ndb.orders.aggregate([\n  { $match: { status: \"A\" } },\n  { $group: { _id: \"$cust_id\", total: { $sum: \"$amount\" } } }\n])\n```\n\nMastering pipelines can save you from performing heavy computations in your Node.js application layer.",
        tags: ["MongoDB", "Database", "Backend"],
        category: "Engineering",
        author: authorIds[3],
        views: 2100,
      },
      {
        title: "The Future of Web Development in 2026",
        content: "Web development is moving faster than ever. Edge computing, AI integration, and WASM are becoming standard.\n\n### Key Trends:\n1. **Edge Computing**: Pushing logic closer to the user.\n2. **AI-Driven Development**: Copilots writing boilerplates.\n3. **WebAssembly (WASM)**: Running high-performance code in the browser.\n\nAre you ready for the next wave?",
        tags: ["Trends", "WebDev", "Tech"],
        category: "General",
        author: authorIds[4],
        views: 5600,
      }
    ];

    await Post.insertMany(postsData);

    console.log("🎉 Database Successfully Seeded with exactly 20 Users and 5 Posts!");
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

if (process.argv[2] === "-d") {
  destroyData();
} else {
  seedData();
}