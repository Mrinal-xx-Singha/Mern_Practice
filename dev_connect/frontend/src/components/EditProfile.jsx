import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../store/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const [skills, setSkills] = useState(
    Array.isArray(user?.skills) ? user?.skills : []
  );
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    // Clear errors
    setError("");
    const skillsArray = Array.isArray(skills)
      ? skills
      : typeof skills === "string"
      ? skills.split(",").map((skill) => skill.trim())
      : []; // convert coma separated  string to array
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
          skills: skillsArray, //send skills as an array
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res?.data?.data));
      toast.success(res?.data?.message);
    } catch (error) {
      setError(error?.response?.data);
      toast.error(error?.response?.data);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen p-6 bg-base-100">
      {/* Profile Edit Form */}
      <div className="w-full lg:w-[60%] shadow-md rounded-lg bg-base-200 p-6">
        <div className="bg-base-200 p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto">
          <h2 className="text-primary font-bold text-center text-2xl mb-5">
            Edit Profile
          </h2>

          <div className="space-y-4">
            {/* First Name */}
            <div>
              <label className="block font-semibold">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter first name"
                className="input input-bordered input-primary w-full mt-1"
                required
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block font-semibold">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter last name"
                className="input input-bordered input-primary w-full mt-1"
                required
              />
            </div>

            {/* Photo URL */}
            <div>
              <label className="block font-semibold">Photo URL</label>
              <input
                type="text"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                placeholder="Enter photo URL"
                className="input input-bordered input-primary w-full mt-1"
                required
              />
            </div>

            {/* Age */}
            <div>
              <label className="block font-semibold">Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter age"
                className="input input-bordered input-primary w-full mt-1"
                required
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block font-semibold">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="select  select-bordered w-full font-semibold mt-1 input-primary"
                required
              >
                <option value="" disabled>
                  Select gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Other</option>
              </select>
            </div>
            {/* Skills */}
            <div>
              <label className="block font-semibold">Skills</label>
              <textarea
                type="text"
                value={skills}
                onChange={(e) =>
                  setSkills(
                    e.target.value.split(",").map((skill) => skill.trim())
                  )
                }
                placeholder="Add your skills.."
                className="textarea textarea-primary w-full mt-1 text-start"
                required
              />
            </div>

            {/* About */}
            <div>
              <label className="block font-semibold">About</label>
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                placeholder="Tell us about yourself..."
                className="textarea textarea-primary w-full mt-1"
                required
              />
            </div>
          </div>

          {/* Error Message */}
          {error && <p className="text-error text-center mt-3">{error}</p>}

          {/* Save Button */}
          <div className="text-center mt-5">
            <button
              className="btn btn-primary w-full py-2"
              onClick={handleSubmit}
            >
              Save Profile
            </button>
          </div>
        </div>
      </div>

      {/* UserCard Section */}
      <div className="mt-6 lg:mt-0 lg:ml-10 w-full lg:w-[35%] flex justify-center items-center">
        <UserCard
          user={{ firstName, lastName, photoUrl, age, gender, about, skills }}
        />
      </div>
    </div>
  );
};

export default EditProfile;
