import React from "react";
import EditProfile from "../components/EditProfile";
import { useSelector } from "react-redux";

const Profile = () => {
  const User = useSelector((store) => store.user);
  return (
    User && (
      <div className="bg-base-100 min-h-screen">
        <EditProfile user={User} />
      </div>
    )
  );
};

export default Profile;
