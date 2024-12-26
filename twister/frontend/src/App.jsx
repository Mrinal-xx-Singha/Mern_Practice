// Import necessary modules
import React, { useState, useEffect } from "react";
import axios from "axios";
// import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import BlogForm from "./components/BlogForm";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Header from "./components/Header";
import BlogList from "./components/BlogList";
import BlogDetails from "./components/BlogDetails";
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");



  // Backend API Base URL
  const API_BASE_URL = 'http://localhost:5000/api';


  //Fetch blogs from the backend
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/blogs`);
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs", error);
      }
    };
    fetchBlogs();
  }, []);

  // Handle blog submission
  const handleCreateBlog = async () => {
    if (!token) return alert("Please log in first");
    try {
      const response = await axios.post(
        `${API_BASE_URL}/blogs`,
        { title, content, author: "YourUserId" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBlogs([...blogs, response.data.blog]);
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  // Handle blog selection for viewing
  const handleViewBlog = (blog) => {
    setSelectedBlog(blog);
  };

  // Handle blog deletion

  const handleDeleteBlog = async (id) => {
    if (!token) return alert("Please log in first.");
    try {
      await axios.delete(`${API_BASE_URL}/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogs(blogs.filter((blog) => blog._id !== id));
    } catch (error) {}
  };

  // Logout Handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  return (
    <Router>
      <div className="App bg-gray-50 min-h-screen">
        <Header />
        <div className="p-6">
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <BlogForm
                    token={token}
                    title={title}
                    setTitle={setTitle}
                    content={content}
                    setContent={setContent}
                    handleCreateBlog={handleCreateBlog}
                  />
                  <BlogList
                    blogs={blogs}
                    handleViewBlog={handleViewBlog}
                    handleDeleteBlog={handleDeleteBlog}
                    token={token}
                  />
                  {selectedBlog && (
                    <BlogDetails
                      selectedBlog={selectedBlog}
                      setSelectedBlog={setSelectedBlog}
                    />
                  )}
                </div>
              }
            />
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
