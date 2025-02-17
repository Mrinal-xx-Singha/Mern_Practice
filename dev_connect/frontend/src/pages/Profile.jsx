import React from "react";
import EditProfile from "../components/EditProfile";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((store) => store.user);
  return (
    user && (
      <div className="bg-base-100 min-h-screen">
        <EditProfile user={user} />
      </div>
    )
  );
};

export default Profile;
