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
import JobDetails from "./pages/JobDetails"
import EditPost from "./components/posts/EditPost";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Bookmarks from "./components/posts/Bookmarks";
import LandingPage from "./pages/LandingPage";
import AdminDashboard from "./pages/AdminDashboard";
import Jobs from "./pages/Jobs";
import CreateJob from "./pages/CreateJob";
import { AnimatePresence } from "motion/react"
import PageTransition from "./components/PageTransition";



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
          <div className="w-8 h-8 border-2 border-(--color-text-muted) border-t-(--color-text) rounded-full animate-spin" />
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
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={user ? <Navigate to="/feed" replace /> :
              <PageTransition>
                <LandingPage />
              </PageTransition>

            }
          />

          {/* protected feed, visible only after login  */}
          <Route
            path="/feed"
            element={
              <PrivateRoute>
                <PageTransition>
                  <PostList />
                </PageTransition>
              </PrivateRoute>
            }
          />
          <Route
            path="/create"
            element={
              <PrivateRoute>
                <PageTransition>
                  <CreatePost />
                </PageTransition>
              </PrivateRoute>
            }
          />
          <Route path="/jobs/create" element={
            <PrivateRoute>
              <PageTransition>
                <CreateJob />
              </PageTransition>
            </PrivateRoute>
          } />
          <Route
            path="/jobs"
            element={
              <PrivateRoute>
                <PageTransition>
                  <Jobs />
                </PageTransition>
              </PrivateRoute>
            }
          />
          <Route
            path="/jobs/:id"
            element={
              <PrivateRoute>
                <PageTransition>
                  <JobDetails />
                </PageTransition>
              </PrivateRoute>

            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <PageTransition>

                  <Profile />
                </PageTransition>
              </PrivateRoute>
            }
          />
          <Route
            path="/bookmarks"
            element={
              <PrivateRoute>
                <PageTransition>
                  <Bookmarks />
                </PageTransition>
              </PrivateRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <PrivateRoute>
                <PageTransition>
                  <EditPost />
                </PageTransition>
              </PrivateRoute>
            }
          />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <PageTransition>
                  <AdminDashboard />
                </PageTransition>
              </AdminRoute>
            }
          />
          <Route
            path="/login"
            element={!user ?
              <PageTransition>
                <Login />
              </PageTransition>
              : <Navigate to="/" />}
          />
          <Route
            path="/register"
            element={!user ?
              <PageTransition>
                <Register />
              </PageTransition>
              : <Navigate to="/" />}
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default App;
