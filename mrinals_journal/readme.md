# 📖 Mrinal's — A MERN Stack Blogging Platform

<div align="center">

![License](https://img.shields.io/badge/license-MIT-green)  
![Tech Stack](https://img.shields.io/badge/stack-MERN-blue)  
![React](https://img.shields.io/badge/React-19.1.0-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1-06B6D4?logo=tailwindcss)

**A modern, feature-rich blogging platform built with the MERN stack**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#️-installation--setup) • [API Documentation](#-api-endpoints) • [Contributing](#-contributing)

</div>

---

## 📌 Overview

**Writely** is a full-stack blogging platform that empowers users to create, share, and engage with content. Built with modern web technologies, it features JWT authentication, real-time interactions, markdown support, and a beautiful, responsive UI.

### 🎯 Key Highlights

- 🔒 **Secure Authentication** with JWT tokens and HTTP-only cookies
- 📝 **Rich Text Editor** with Markdown and code syntax highlighting
- 💬 **Interactive Comments** with nested replies
- 👤 **User Profiles** with Cloudinary-powered image uploads
- 🎨 **Modern UI** built with React, TailwindCSS, and smooth animations
- 📱 **Fully Responsive** design for all devices

---

## ✨ Features

### 🔐 Authentication & Security

- **JWT-based authentication** with access and refresh tokens
- **HttpOnly cookies** for secure token storage
- **Password hashing** using bcryptjs
- **Protected routes** with role-based access control
- **Persistent sessions** across browser refreshes

### 📝 Blog Management

- **Create, edit, and delete** your own posts
- **Rich-text editor** with full Markdown support
- **Code syntax highlighting** using highlight.js
- **Post categorization** with tags and categories
- **Draft and publish** workflow
- **Search and filter** posts by title, author, or tags

### 💬 Engagement Features

- **Nested comments** with threaded replies
- **Comment moderation** (edit/delete your own comments)
- **Post reactions** and likes
- **View count tracking** for analytics
- **Bookmark posts** for later reading
- **User mentions** in comments

### 👤 User Profiles

- **Customizable profiles** with bio and avatar
- **Avatar upload** via Cloudinary integration
- **View authored posts** on profile page
- **Display bookmarked posts**
- **User activity timeline**

### 🌐 Modern UI/UX

- **Responsive design** optimized for mobile, tablet, and desktop
- **Smooth animations** and hover effects using Lucide React icons
- **Dark mode support** (if implemented)
- **Toast notifications** for user feedback with react-hot-toast
- **Loading states** and skeleton screens
- **Pagination** for efficient data loading

---

## 🛠 Tech Stack

### Frontend

| Technology          | Version | Purpose                            |
| ------------------- | ------- | ---------------------------------- |
| **React**           | 19.1.0  | UI library for building components |
| **Redux Toolkit**   | 2.8.2   | State management                   |
| **React Router**    | 7.6.2   | Client-side routing                |
| **TailwindCSS**     | 4.1.10  | Utility-first CSS framework        |
| **Vite**            | 6.3.5   | Build tool and dev server          |
| **Axios**           | 1.10.0  | HTTP client for API requests       |
| **React Markdown**  | 10.1.0  | Markdown rendering                 |
| **Highlight.js**    | 11.11.1 | Code syntax highlighting           |
| **Lucide React**    | 0.525.0 | Modern icon library                |
| **React Hot Toast** | 2.5.2   | Toast notifications                |
| **date-fns**        | 4.1.0   | Date formatting utilities          |

### Backend

| Technology            | Version | Purpose                         |
| --------------------- | ------- | ------------------------------- |
| **Node.js**           | -       | JavaScript runtime              |
| **Express**           | 5.1.0   | Web application framework       |
| **MongoDB**           | -       | NoSQL database                  |
| **Mongoose**          | 8.16.0  | MongoDB object modeling         |
| **JWT**               | 9.0.2   | Token-based authentication      |
| **bcryptjs**          | 3.0.2   | Password hashing                |
| **Cloudinary**        | 1.41.3  | Image hosting and management    |
| **Multer**            | 2.0.1   | File upload middleware          |
| **Express Validator** | 7.2.1   | Request validation              |
| **Cookie Parser**     | 1.4.7   | Parse cookies                   |
| **CORS**              | 2.8.5   | Cross-origin resource sharing   |
| **dotenv**            | 16.5.0  | Environment variable management |

---

## 📂 Project Structure

```
Writely/
│
├── backend/                    # Express API server
│   ├── middleware/            # Custom middleware (auth, validation, error handling)
│   ├── models/                # Mongoose schemas
│   │   ├── User.js           # User model
│   │   ├── Post.js           # Post model
│   │   └── Comment.js        # Comment model
│   ├── routes/               # API route handlers
│   │   ├── auth.js          # Authentication routes
│   │   ├── posts.js         # Post CRUD routes
│   │   ├── comments.js      # Comment routes
│   │   └── profile.js       # User profile routes
│   ├── utils/               # Utility functions
│   ├── server.js            # Express app entry point
│   ├── package.json         # Backend dependencies
│   └── .env                 # Environment variables
│
├── frontend/                  # React application
│   ├── src/
│   │   ├── assets/          # Static assets (images, fonts)
│   │   ├── components/      # Reusable React components
│   │   │   ├── posts/      # Post-related components
│   │   │   ├── Navbar.jsx  # Navigation bar
│   │   │   ├── Profile.jsx # User profile component
│   │   │   └── PrivateRoute.jsx # Protected route wrapper
│   │   ├── pages/          # Page-level components
│   │   │   ├── Login.jsx   # Login page
│   │   │   ├── Register.jsx # Registration page
│   │   │   └── LandingPage.jsx # Landing page
│   │   ├── redux/          # Redux store and slices
│   │   │   └── slices/     # Redux Toolkit slices
│   │   │       └── authSlice.js # Authentication state
│   │   ├── services/       # API service layer
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # React entry point
│   ├── public/             # Public static files
│   ├── index.html          # HTML template
│   ├── vite.config.js      # Vite configuration
│   ├── tailwind.config.js  # TailwindCSS configuration
│   └── package.json        # Frontend dependencies
│
├── .gitignore              # Git ignore rules
└── README.md               # Project documentation
```

---

## ⚙️ Installation & Setup

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **pnpm** package manager
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git**

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Mrinal-xx-Singha/Mern_Practice.git
cd Mern_Practice/Writely_
```

### 2️⃣ Backend Setup

#### Install Dependencies

```bash
cd backend
npm install
```

#### Configure Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/Writely_?retryWrites=true&w=majority

# JWT Secrets (use strong, random strings)
JWT_SECRET=your_super_secret_jwt_key_here
REFRESH_SECRET=your_super_secret_refresh_key_here

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# CORS (optional, for production)
CLIENT_URL=http://localhost:5173
```

> **Note:** Replace placeholder values with your actual credentials. For MongoDB Atlas, create a free cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas). For Cloudinary, sign up at [cloudinary.com](https://cloudinary.com/).

#### Start the Backend Server

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The backend API will run at `http://localhost:5000`

### 3️⃣ Frontend Setup

#### Install Dependencies

```bash
cd ../frontend
pnpm install

# Or using npm
npm install
```

#### Configure API Endpoint (Optional)

If your backend runs on a different port, update the API base URL in your axios configuration or service files.

#### Start the Development Server

```bash
pnpm dev

# Or using npm
npm run dev
```

The frontend will run at `http://localhost:5173` (Vite default)

### 4️⃣ Access the Application

Open your browser and navigate to:

- **Frontend:** [http://localhost:5173](http://localhost:5173)
- **Backend API:** [http://localhost:5000](http://localhost:5000)

---

## � API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint    | Description                   | Auth Required |
| ------ | ----------- | ----------------------------- | ------------- |
| POST   | `/register` | Register a new user           | ❌            |
| POST   | `/login`    | Login user and get tokens     | ❌            |
| POST   | `/logout`   | Logout user and clear cookies | ✅            |
| GET    | `/me`       | Get current user profile      | ✅            |
| POST   | `/refresh`  | Refresh access token          | ✅            |

### Post Routes (`/api/posts`)

| Method | Endpoint        | Description                     | Auth Required   |
| ------ | --------------- | ------------------------------- | --------------- |
| GET    | `/`             | Get all posts (with pagination) | ❌              |
| GET    | `/:id`          | Get single post by ID           | ❌              |
| POST   | `/`             | Create a new post               | ✅              |
| PUT    | `/:id`          | Update a post                   | ✅ (Owner only) |
| DELETE | `/:id`          | Delete a post                   | ✅ (Owner only) |
| POST   | `/:id/like`     | Like/unlike a post              | ✅              |
| POST   | `/:id/bookmark` | Bookmark/unbookmark a post      | ✅              |

### Comment Routes (`/api/comments`)

| Method | Endpoint        | Description                 | Auth Required   |
| ------ | --------------- | --------------------------- | --------------- |
| GET    | `/post/:postId` | Get all comments for a post | ❌              |
| POST   | `/post/:postId` | Add a comment to a post     | ✅              |
| PUT    | `/:id`          | Update a comment            | ✅ (Owner only) |
| DELETE | `/:id`          | Delete a comment            | ✅ (Owner only) |
| POST   | `/:id/reply`    | Reply to a comment          | ✅              |

### Profile Routes (`/api/profile`)

| Method | Endpoint     | Description           | Auth Required |
| ------ | ------------ | --------------------- | ------------- |
| GET    | `/:userId`   | Get user profile      | ❌            |
| PUT    | `/`          | Update own profile    | ✅            |
| POST   | `/avatar`    | Upload profile avatar | ✅            |
| GET    | `/posts`     | Get user's posts      | ✅            |
| GET    | `/bookmarks` | Get bookmarked posts  | ✅            |

---

## � Testing

### Manual Testing

1. **Register a new account** at `/register`
2. **Login** with your credentials
3. **Create a post** using the rich text editor
4. **Add comments** to posts
5. **Edit your profile** and upload an avatar
6. **Test bookmarking** and liking posts

### API Testing with Postman/Thunder Client

Import the API endpoints and test each route with appropriate headers and body data.

---

## 🚀 Deployment

### Backend Deployment (Render/Railway/Heroku)

1. Push your code to GitHub
2. Connect your repository to your hosting platform
3. Set environment variables in the platform dashboard
4. Deploy the `backend` directory

### Frontend Deployment (Vercel/Netlify)

1. Build the production bundle:
   ```bash
   cd frontend
   pnpm build
   ```
2. Deploy the `dist` folder to Vercel or Netlify
3. Update the API base URL to your deployed backend

### Database (MongoDB Atlas)

- Use MongoDB Atlas for production database
- Whitelist your deployment server's IP address
- Use connection string in your backend `.env`

---

## 📸 Screenshots

> Add screenshots of your application here to showcase the UI

---

## 🗺️ Roadmap

- [ ] Add real-time notifications
- [ ] Implement email verification
- [ ] Add social media sharing
- [ ] Create admin dashboard
- [ ] Add post analytics
- [ ] Implement full-text search
- [ ] Add dark mode toggle
- [ ] Support for multiple languages

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Update documentation for new features
- Test your changes thoroughly

---

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 📬 Contact

**Mrinal Singha**

- GitHub: [@Mrinal-xx-Singha](https://github.com/Mrinal-xx-Singha)
- Repository: [Mern_Practice](https://github.com/Mrinal-xx-Singha/Mern_Practice)

---

## 🙏 Acknowledgments

- [React Documentation](https://react.dev/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [Cloudinary](https://cloudinary.com/)

---

<div align="center">

**⭐ If you found this project helpful, please give it a star!**

Made with ❤️ by Mrinal Singha

</div>
