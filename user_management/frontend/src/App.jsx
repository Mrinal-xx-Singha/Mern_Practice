import React, { useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
  Link,
} from "react-router-dom";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./components/LoginPage";
import Profile from "./components/Profile";
import Register from "./components/Register";



const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <nav className="p-4 bg-blue-800 text-white flex justify-between">
        <h1 className="md:text-lg font-bold uppercase md:tracking-wider sm:text-sm sm:tracking-normal">
          User Management
        </h1>
        <div className="space-x-4 sm:text-md md:text-lg">
          <Link to="/register" className="hover:underline ">
            Register
          </Link>
          <Link to="/login" className="hover:underline ">
            Login
          </Link>
          <Link to="/profile" className="hover:underline ">
            Profile
          </Link>
        </div>
      </nav>
      <Routes>
        <Route path="/register" element={<Register />}/>
        <Route
          path="/login"
          element={<LoginPage />}
          onLogin={() => setIsAuthenticated(true)}
        />
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
