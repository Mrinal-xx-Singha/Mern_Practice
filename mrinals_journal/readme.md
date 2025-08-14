# 📖 Mrinal's Journal — A MERN Stack Blogging Platform

![License](https://img.shields.io/badge/license-MIT-green)  
![Tech Stack](https://img.shields.io/badge/stack-MERN-blue)  
![Responsive](https://img.shields.io/badge/Responsive-Yes-success)

---

## 📌 Overview

**Mrinal's Journal** is a modern **MERN stack blogging platform** that allows users to create, edit, delete, and interact with blog posts in real time.  
It’s built with a focus on **clean UI, secure authentication, and full CRUD functionality** for an engaging reading and writing experience.

---

## ✨ Features

### 🔐 Authentication & Security
- JWT-based authentication with **HttpOnly cookies**
- Password hashing using **bcrypt**
- Role-based access control (`user` & `admin` roles)

### 📝 Blog Management
- Create, edit, delete your own posts
- Rich-text editor with **Markdown** support
- Code syntax highlighting for developers
- Categories & tags for content organization

### 💬 Engagement Features
- Nested comments & replies
- Post reactions (👍 ❤️ 😂 😢)
- View count tracking
- Bookmark/save posts for later

### 👤 User Profiles
- Profile pages with avatar upload (via **Cloudinary**)
- Display all authored & bookmarked posts

### 🌐 Modern UI/UX
- Fully responsive, mobile-friendly design
- Smooth animations & hover effects
- Pagination & search for posts

---

## 🛠 Tech Stack

| **Frontend**      | **Backend**     | **Database** | **Other Tools** |
|-------------------|-----------------|--------------|-----------------|
| React + Redux     | Node.js + Express | MongoDB      | Cloudinary      |
| TailwindCSS       | JWT Auth        | MongoDB Atlas | Axios           |
| React Markdown    | bcrypt          |              | DaisyUI         |

---

## 📂 Folder Structure

mrinals_journal/
│
├── backend/ # Express API (routes, models, controllers)
├── frontend/ # React + Redux app
│ ├── components/ # Reusable UI components
│ ├── pages/ # Page-level components
│ ├── redux/ # Redux slices and store config
│
├── .env.example # Environment variable template
├── package.json # Project metadata and dependencies
└── README.md


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Mrinal-xx-Singha/Mern_Practice.git
cd Mern_Practice/mrinals_journal
```

### 2️⃣ Install dependencies ###

## Backend dependencies 

```bash 
cd backend
npm install
```
## Frontend dependencies
```bash
cd frontend
pnpm dev
```
### 3️⃣ Setup environment variables
## Create .env files in the backend folder.

Backend **.env** example 

```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

```

### 🚀 Running the Application

## Backend
```bash
cd backend
npm run dev
```

## Frontend

```bash
cd frontend
pnpm dev

```

The app will be available at:

Frontend: http://localhost:3000

Backend API: http://localhost:5000


📜 License

This project is licensed under the MIT License.


🤝 Contributing

Pull requests are welcome!
If you’d like to add features or fix bugs, please fork the repository and create a PR.

📬 Contact

Mrinal Singha