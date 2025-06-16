import React, { useEffect, useState } from "react";
import axios from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";

const Profile = () => {
  const [user, setUser] = useState(null);
  const { logout } = useAuth();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await axios.get("/profile");
        setUser(res.data);
      } catch (error) {
        console.error("Profile fetch failed", error);
      }
    };

    getProfile();
  }, []);

  async function handleLogout() {
    logout();
    alert("User Logged out");
  }
  return (
    <div className="p-6">
      {user ? (
        <div className="text-center">
          <h2 className="">Welcome ,{user.name}</h2>
          <p className="text-gray-600">Email: {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p className="text-center">Loading Profile....</p>
      )}
    </div>
  );
};

export default Profile;
