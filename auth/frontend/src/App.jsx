// src/App.jsx
import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Login from "./pages/Login";
import { getCurrentUser } from "./redux/slices/authSlice";
import CreatePost from "./components/posts/CreatePost";
import PostList from "./components/posts/PostList";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import PostDetails from "./components/posts/PostDetails";
import EditPost from "./components/posts/EditPost";
const App = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser()); // persist login via cookie
  }, [dispatch]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
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
      <Route path="/posts/:id" element={<PostDetails />} />
      <Route 
      path="/edit/:id"
      element={<PrivateRoute>
        <EditPost />
      </PrivateRoute>}
      />
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
      <Route
        path="/register"
        element={!user ? <Register /> : <Navigate to="/" />}
      />
    </Routes>
  );
};

export default App;
