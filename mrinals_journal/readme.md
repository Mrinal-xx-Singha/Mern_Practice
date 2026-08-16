# 📖 Writely — A MERN Stack Blogging & Job Board Platform

<div align="center">

![License](https://img.shields.io/badge/license-MIT-green)  
![Tech Stack](https://img.shields.io/badge/stack-MERN-blue)  
![React](https://img.shields.io/badge/React-19.1.0-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb)
![Gemini AI](https://img.shields.io/badge/Google-Gemini_AI-4285F4?logo=google)

**A production-ready platform featuring AI integrations, web scraping, and premium UI animations.**

[Technical Highlights](#-technical-highlights-for-recruiters) • [Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#️-installation--setup) • [API](#-api-endpoints)

</div>

---

## 📌 Overview

**Writely** is not just a standard CRUD application. It is a highly scaled full-stack platform that combines a **Rich-Text Blogging Engine** with an **Automated Job Board**. Built for modern web standards, it integrates Google's Gemini AI, automated web scraping, complex MongoDB relationships, and buttery-smooth Framer Motion page transitions.

---

## 🎯 Technical Highlights (For Recruiters)

This project was built to solve complex engineering challenges beyond basic tutorials:

- **AI Resume Matcher (Gemini 2.5 Flash)**: Implemented a custom prompt engineering pipeline that takes a user's raw resume text and compares it against a Job Description, returning a JSON-parsed Match Score (0-100%) and 3 actionable tips for the candidate.
- **Automated Web Scraping Engine**: Built a background Node.js service using `axios` and `cheerio` to parse XML/RSS feeds from external job boards (like WeWorkRemotely). This automatically populates the MongoDB database with real-world remote jobs.
- **Complex Cloudinary File Handling**: Configured custom `multer-storage-cloudinary` streams to handle not just standard Avatar image uploads, but raw `.pdf` Resume parsing and storage for job applications.
- **Framer Motion & Glassmorphism UI**: Completely overhauled the React Router DOM architecture by injecting `<AnimatePresence mode="wait">` to enable native-app-like full-page crossfade transitions, complete with staggered Skeleton Loaders.
- **React StrictMode Optimization**: Engineered a bulletproof, idempotent View Counter using `localStorage` caching to prevent double-counting bugs caused by React 18's concurrent rendering and strict mode mounting.

---

## ✨ Core Features

### 🤖 AI & Job Board
- **Automated Job Aggregation**: Scrapes remote tech jobs from the web daily.
- **Employer Portals**: Employers can post internal jobs and track applicants.
- **AI Fit Analysis**: Get a personalized Gemini AI match score before applying.
- **PDF Uploads**: Seamlessly upload and store PDF resumes.

### 📝 Blogging Engine
- **Rich-Text Markdown Editor**: Full syntax highlighting (`highlight.js`).
- **AI Grammar Fixes**: Use Gemini AI to auto-correct blog drafts.
- **Spam-Proof Analytics**: View counters protected against rapid refreshing.
- **Interactive Engagement**: Nested comments, threaded replies, and post bookmarks.

### 🔐 Security & Auth
- **JWT & HTTP-Only Cookies**: Secure, persistent authentication.
- **Role-Based Access Control**: `User`, `Employer`, and `Admin` route protection.

---

## 🛠 Tech Stack

### Frontend
- **Framework**: React 19, React Router v7
- **State Management**: Redux Toolkit (Async Thunks)
- **Styling**: TailwindCSS v4, Framer Motion (Micro-animations)
- **HTTP Client**: Axios (with interceptors)

### Backend
- **Server**: Node.js, Express.js
- **Database**: MongoDB Atlas, Mongoose
- **AI Engine**: `@google/genai` (Gemini 2.5 Flash)
- **Scraping**: Cheerio, XML parsing
- **File Storage**: Cloudinary, Multer

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

## 📡 Key API Endpoints

### Jobs & Scraper (`/api/jobs`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Fetch all jobs (internal + scraped) |
| `POST` | `/` | Employer posts a new job |
| `POST` | `/:id/apply` | Upload a PDF resume to apply |
| `POST` | `/scrape` | Trigger the background web scraper |

### AI Integration (`/api/ai`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/match` | Gemini AI calculates Resume vs Job Description score |
| `POST` | `/enhance` | Gemini AI fixes grammar and writes titles |

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📜 License
This project is licensed under the MIT License.

## 📬 Contact
**Mrinal Singha**
- GitHub: [@Mrinal-xx-Singha](https://github.com/Mrinal-xx-Singha)
