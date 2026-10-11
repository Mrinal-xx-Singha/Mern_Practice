import React, { Suspense, useEffect, lazy } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "./redux/slices/authSlice";
import PageLoader from "./components/ui/PageLoader";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import Navbar from "./components/Navbar";
import PageTransition from "./components/PageTransition";
import { AnimatePresence } from "motion/react";

const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const LandingPage = lazy(() => import("./pages/LandingPage"));
const PostList = lazy(() => import("./components/posts/PostList"));
const PostDetails = lazy(() => import("./components/posts/PostDetails"));
const CreatePost = lazy(() => import("./components/posts/CreatePost"));
const EditPost = lazy(() => import("./components/posts/EditPost"));
const Profile = lazy(() => import("./components/Profile"));
const Bookmarks = lazy(() => import("./components/posts/Bookmarks"));
const Jobs = lazy(() => import("./pages/Jobs"));
const JobDetails = lazy(() => import("./pages/JobDetails"));
const CreateJob = lazy(() => import("./pages/CreateJob"));
const EmployerDashboard = lazy(() => import("./pages/EmployerDashboard"));
const MyApplications = lazy(() => import("./pages/MyApplications"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));


const ProtectedPage = ({ children }) => (
  <PrivateRoute>
    <PageTransition>{children}</PageTransition>
  </PrivateRoute>
);

const App = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  if (loading) {
    return (
    <PageLoader />
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
        <Suspense fallback={<PageLoader />}>

        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={user ? <Navigate to="/feed" replace /> :
              <PageTransition>
                <LandingPage />
              </PageTransition>
            }
            />
          <Route path="/my-applications" element={<ProtectedPage><MyApplications /></ProtectedPage>} />
          <Route path="/feed" element={<ProtectedPage><PostList /></ProtectedPage>} />
          <Route path="/create" element={<ProtectedPage><CreatePost /></ProtectedPage>} />
          <Route path="/jobs/create" element={<ProtectedPage><CreateJob /></ProtectedPage>} />
          <Route path="/jobs" element={<ProtectedPage><Jobs /></ProtectedPage>} />
          <Route path="/jobs/:id" element={<ProtectedPage><JobDetails /></ProtectedPage>} />
          <Route path="/profile" element={<ProtectedPage><Profile /></ProtectedPage>} />
          <Route path="/bookmarks" element={<ProtectedPage><Bookmarks /></ProtectedPage>} />
          <Route path="/edit/:id" element={<ProtectedPage><EditPost /></ProtectedPage>} />
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
          <Route path="/employer/dashboard" element={<ProtectedPage><EmployerDashboard /></ProtectedPage>} />
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
              </Suspense>
      </AnimatePresence>
    </div>
  );
};

export default App;
