import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import Register from "./pages/Register";
import Home from "./pages/Home";
const App = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      <Routes>
        <Route path="/" element={user && <Home />} />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/Home" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/Home " />}
        />
      </Routes>
    </div>
  );
};

export default App;
