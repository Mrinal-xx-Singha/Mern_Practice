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
import Bookmarks from "./components/posts/Bookmarks";
import LandingPage from "./pages/LandingPage";

const App = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[var(--color-text-muted)] border-t-[var(--color-text)] rounded-full animate-spin" />
          <p
            className="text-sm"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Loading...
          </p>
        </div>
      </div>
    );
  }

  const noNavbarRoutes = ["/login", "/register", "/"];

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
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
            path="/bookmarks"
            element={
              <PrivateRoute>
                <Bookmarks />
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
