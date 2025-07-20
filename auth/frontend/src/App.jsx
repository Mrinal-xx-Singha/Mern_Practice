// src/App.jsx
import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "./redux/slices/authSlice";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePost from "./components/posts/CreatePost";
import PostList from "./components/posts/PostList";
import PostDetails from "./components/posts/PostDetails";
import EditPost from "./components/posts/EditPost";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import LandingPage from "./pages/LandingPage";

const App = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(getCurrentUser()); // Persist login via cookie
  }, [dispatch]);

  if (loading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="text-lg font-semibold text-gray-600 animate-pulse">
          Loading your personalized feed...
        </div>
      </div>
    );
  }

  // Pages where you don’t want navbar (like auth)
  const noNavbarRoutes = ["/login", "/register", "/"];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {!noNavbarRoutes.includes(location.pathname) && <Navbar />}
      <div>
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/feed" replace /> : <LandingPage />}
          />

          {/* protected feed, visible only after login  */}
          <Route
            path="/feed"
            element={
              <PrivateRoute>
                <PostList />
              </PrivateRoute>
            }
          />
          <Route
            path="/create"
            element={
              <PrivateRoute>
                <CreatePost />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <PrivateRoute>
                <EditPost />
              </PrivateRoute>
            }
          />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/register"
            element={!user ? <Register /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
