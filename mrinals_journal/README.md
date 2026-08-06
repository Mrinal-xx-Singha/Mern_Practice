# Writely - Modern Technical Blogging Platform

Welcome to **Writely**! This is a full-stack, enterprise-grade publishing platform designed for developers and technical writers. It features a stunning, dynamic editorial design, rich Markdown support with syntax highlighting, and a robust backend architecture.

## 🚀 Key Features

- **Dynamic Theme Engine**: A flawlessly executed Dark/Light mode architecture utilizing custom CSS properties and responsive Tailwind utility classes. Experience a classic warm editorial cream in light mode, and a rich, luxurious midnight slate in dark mode.
- **Instant Recruiter Demo Access**: Frictionless, one-click `Demo User` and `Demo Admin` auto-login options on the authentication page, allowing hiring managers and evaluators to instantly test the platform without registering.
- **Rich Markdown Editor & Renderer**: Full support for GitHub-flavored Markdown. It automatically renders syntax-highlighted code blocks, inline code, blockquotes, and custom tables with high-contrast accessibility.
- **Role-Based Access Control (RBAC)**: Secure access gating separating standard `user` accounts from `admin` accounts (equipped with an exclusive Admin Dashboard to manage users).
- **Advanced Authentication**: Secure, stateful authentication using JSON Web Tokens (JWT) stored in HttpOnly cookies, protecting against XSS attacks.
- **Responsive & Premium UX**: Micro-animations, blurred navigation bars, custom skeleton loaders, and interactive hover states for a polished, "WOW" user experience.

## 🛠️ Tech Stack

**Frontend:**
- React 18 (Vite)
- Tailwind CSS v4
- Redux Toolkit (State Management)
- React Router v6
- React-Markdown (with `remark-gfm` and `rehype-highlight`)

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose (ODM)
- JWT Authentication (HttpOnly Cookies)
- Cloudinary (Image Uploads)
- Express Rate Limit & Helmet (Security)

## 🏎️ Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18+) and [MongoDB](https://www.mongodb.com/) installed on your machine.

### 1. Clone the Repository
```bash
git clone https://github.com/Mrinal-xx-Singha/Mern_Practice.git
cd Mern_Practice/mrinals_journal
```

### 2. Environment Setup
Create a `.env` file inside the `backend` directory with the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=development

# Cloudinary (Optional, for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Install Dependencies & Run

**Open Terminal 1 (Backend):**
```bash
cd backend
npm install
npm run dev
```

**Open Terminal 2 (Frontend):**
```bash
cd frontend
npm install
npm run dev
```

The application will be running at `http://localhost:5173`.

## 🗺️ Roadmap / Upcoming Features
- [ ] **Database Seeder CLI**: Robust script to populate realistic engineering articles, simulated users, and comment threads for local testing.
- [ ] **AI-Powered Writing Assistant**: Integration with Gemini/OpenRouter to auto-generate post summaries, refine grammar, and suggest tags.
- [ ] **Real-time Notifications**: Socket.io integration for instant toast notifications when receiving likes or comments.
- [ ] **Redis Caching**: Performance layer for high-speed feed delivery.

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!

---
*Built with ❤️ by Mrinal*
