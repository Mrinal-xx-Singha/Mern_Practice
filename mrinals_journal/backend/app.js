const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");

// Routes
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");
const commentRoutes = require("./routes/comments");
const profileRoutes = require("./routes/profile");
const aiRoutes = require("./routes/ai");
const jobRoutes = require("./routes/jobs");
const adminRoutes = require("./routes/admin");
const notificationRoutes = require("./routes/notifications");

// Middleware
const auth = require("./middleware/auth");
const User = require("./models/User");

dotenv.config();

const app = express();

app.set("trust proxy", 1);
app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV !== "test") {
    app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
}

// Rate Limiting (Disabled in test mode to avoid test timeouts)
if (process.env.NODE_ENV !== "test") {
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
        message: "Too many requests, please try again later",
    });
    app.use("/api/", limiter);
}

const allowedOrigins = [
    "http://localhost:5173",
    "https://writelyjobs.netlify.app",
];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin) return callback(null, true);
            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            } else {
                return callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    })
);

app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                imgSrc: [
                    "'self'",
                    "data:",
                    "https://res.cloudinary.com",
                    "https://ui-avatars.com",
                ],
            },
        },
    })
);
app.use(hpp());

// Health check
app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});

// Route registrations
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/users", profileRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/notifications", notificationRoutes);

app.get("/api/protected", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json({ message: `Welcome, ${user.username}`, user });
    } catch (error) {
        res.status(400).json({ message: "Error occurred" });
    }
});

// Centralized error handler
app.use((err, req, res, next) => {
    if (process.env.NODE_ENV !== "test") console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});

module.exports = app;