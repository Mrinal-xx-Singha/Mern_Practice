# 📖 Writely — A MERN Stack Blogging & Job Board Platform

<div align="center">

![License](https://img.shields.io/badge/license-MIT-green)  
![Tech Stack](https://img.shields.io/badge/stack-MERN-blue)  
![React](https://img.shields.io/badge/React-19.1.0-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb)
![Gemini AI](https://img.shields.io/badge/Google-Gemini_AI-4285F4?logo=google)

**A production-ready platform featuring AI integrations, real-time notifications, web scraping, and premium UI animations.**

[Technical Highlights](#-technical-highlights-for-recruiters) • [Features](#-features) • [Tech Stack](#-tech-stack) • [Architecture](#-architecture) • [Installation](#️-installation--setup) • [API](#-api-endpoints)

</div>

---

## 📌 Overview

**Writely** is not just a standard CRUD application. It is a highly scaled full-stack platform that combines a **Rich-Text Blogging Engine** with an **Automated Job Board**. Built for modern web standards, it integrates Google's Gemini AI, automated web scraping, a real-time notification system, complex MongoDB relationships, and buttery-smooth Framer Motion page transitions.

---

## 🎯 Technical Highlights (For Recruiters)

This project was built to solve complex engineering challenges beyond basic tutorials:

- **AI Resume Matcher (Gemini 2.5 Flash)**: Implemented a custom prompt engineering pipeline that takes a user's raw resume text and compares it against a Job Description, returning a JSON-parsed Match Score (0-100%) and a contextual summary for the candidate.
- **Automated Web Scraping Engine**: Built a background Node.js service using `axios` and `cheerio` to parse XML/RSS feeds from external job boards (like WeWorkRemotely). This automatically populates the MongoDB database with real-world remote jobs.
- **Real-Time Notification System**: Engineered a polling-based notification system with a MongoDB TTL index for auto-cleanup, optimistic UI updates in Redux, and a `visibilityState`-aware 30s poller that pauses on hidden tabs.
- **Complex Cloudinary File Handling**: Configured custom `multer-storage-cloudinary` streams to handle not just standard Avatar image uploads, but raw `.pdf` Resume parsing and storage for job applications.
- **MVC Architecture Refactor**: Systematically split 7 monolithic Express route files into dedicated controllers and thin routing maps — reducing average route file size by ~80% and making every handler independently testable.
- **Framer Motion & Glassmorphism UI**: Completely overhauled the React Router DOM architecture by injecting `<AnimatePresence mode="wait">` to enable native-app-like full-page crossfade transitions, complete with staggered Skeleton Loaders.
- **React StrictMode Optimization**: Engineered a bulletproof, idempotent View Counter using `localStorage` caching to prevent double-counting bugs caused by React 18's concurrent rendering and strict mode mounting.
- **Route-Level Code Splitting**: Reduced initial JS bundle from **1.8MB → 158kB** using `React.lazy` + `Suspense` for every protected page.

---

## ✨ Core Features

### 🔔 Notifications
- **Real-time bell** in the Navbar with unread badge count
- Triggered automatically on: new job applications, application status changes, new comments, and post bookmarks
- Mark one / mark all as read, delete individual notifications
- Auto-expires after 30 days via MongoDB TTL index — zero maintenance

### 🤖 AI & Job Board
- **Automated Job Aggregation**: Scrapes remote tech jobs from the web daily
- **Employer Portals**: Employers can post internal jobs and track applicants
- **AI Fit Analysis**: Get a personalized Gemini AI match score before applying
- **PDF Uploads**: Seamlessly upload and store PDF resumes

### 📝 Blogging Engine
- **Rich-Text Markdown Editor**: Full syntax highlighting (`highlight.js`)
- **AI Writing Tools**: Grammar fix, title generation, and TL;DR summariser via Gemini AI
- **Spam-Proof Analytics**: View counters protected against rapid refreshing
- **Interactive Engagement**: Nested comments, threaded replies, and post bookmarks

### 🔐 Security & Auth
- **JWT & HTTP-Only Cookies**: Secure, persistent authentication with refresh token rotation
- **Role-Based Access Control**: `User`, `Employer`, and `Admin` route protection via `requireRole` middleware
- **Input Validation**: Zod schemas on all mutating endpoints
- **Rate Limiting, Helmet, HPP**: Production security middleware stack

---

## 🛠 Tech Stack

### Frontend
- **Framework**: React 19, React Router v7
- **State Management**: Redux Toolkit (Async Thunks)
- **Styling**: TailwindCSS v4, Framer Motion (Micro-animations)
- **HTTP Client**: Axios
- **UI**: Lucide React icons, react-hot-toast

### Backend
- **Server**: Node.js, Express 5
- **Database**: MongoDB Atlas, Mongoose
- **AI Engine**: `@google/genai` (Gemini 2.5 Flash)
- **Scraping**: Cheerio, XML parsing
- **File Storage**: Cloudinary, Multer
- **Validation**: Zod 4
- **Security**: Helmet, HPP, express-rate-limit, bcryptjs

---

## 🏗 Architecture

```
backend/
├── controllers/        # Business logic (MVC split — all handlers here)
│   ├── authController.js
│   ├── postController.js
│   ├── commentsController.js
│   ├── jobController.js
│   ├── profileController.js
│   ├── adminController.js
│   ├── aiController.js
│   └── notificationController.js
├── routes/             # Thin routing maps — middleware chains only
├── models/             # Mongoose schemas
│   ├── User.js
│   ├── Post.js
│   ├── Comment.js
│   ├── Job.js
│   ├── Application.js
│   └── Notification.js
├── middleware/         # auth, requireRole, requireAdmin, validate, checkOwnerOrAdmin
├── utils/              # createNotification, issueTokens, cloudinary, buildNestedComments
└── services/           # scraper

frontend/
├── src/
│   ├── pages/          # Route-level pages (lazy loaded)
│   ├── components/     # UI components
│   │   ├── posts/      # CreatePost, EditPost, PostMetaFields
│   │   ├── jobs/
│   │   └── ui/         # NotificationBell, NotificationDropdown, badges
│   ├── hooks/          # useNotifications, useImageUpload, useApplications
│   ├── redux/
│   │   └── slices/     # authSlice, postSlice, jobSlice, notificationSlice
│   └── utils/          # badges, helpers
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Mrinal-xx-Singha/Mern_Practice.git
cd Mern_Practice/mrinals_journal
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file:
```env
PORT=5000
MONGO_URI=your_mongodb_string
JWT_SECRET=your_jwt_secret
REFRESH_SECRET=your_refresh_secret
NODE_ENV=development
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
GEMINI_API_KEY=your_google_gemini_key
```
```bash
npm run dev
```

### 3️⃣ Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

---

## 📡 API Endpoints

### Auth (`/api/auth`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/register` | Register a new user |
| `POST` | `/login` | Login and receive JWT cookies |
| `POST` | `/logout` | Clear auth cookies |
| `GET`  | `/refresh-token` | Rotate access token |

### Posts (`/api/posts`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Fetch all posts (paginated) |
| `POST` | `/` | Create a new post |
| `PUT` | `/:id` | Edit a post |
| `DELETE` | `/:id` | Delete a post |
| `POST` | `/:postId/bookmark` | Bookmark / unbookmark a post |

### Jobs (`/api/jobs`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Fetch all active jobs |
| `POST` | `/` | Employer posts a new job |
| `POST` | `/:id/apply` | Upload a PDF resume to apply |
| `POST` | `/scrape` | Trigger the background web scraper (Admin) |
| `PATCH` | `/applications/:id/status` | Update application status (Employer/Admin) |
| `GET` | `/my-applications` | Applicant's own applications |
| `GET` | `/employer/applications` | All applications for employer's jobs |

### AI (`/api/ai`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/enhance` | Grammar fix, title generation, or summarise |
| `POST` | `/match-resume` | Gemini AI resume vs job description score |

### Notifications (`/api/notifications`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Get latest 20 notifications + unread count |
| `PATCH` | `/read-all` | Mark all notifications as read |
| `PATCH` | `/:id/read` | Mark a single notification as read |
| `DELETE` | `/:id` | Delete a notification |

### Admin (`/api/admin`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/users` | List all users |
| `PATCH` | `/users/:id/role` | Update a user's role |
| `DELETE` | `/users/:id` | Delete a user account |

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📜 License
This project is licensed under the MIT License.

## 📬 Contact
**Mrinal Singha**
- GitHub: [@Mrinal-xx-Singha](https://github.com/Mrinal-xx-Singha)
