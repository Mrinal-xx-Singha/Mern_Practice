import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../store/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, skills, about } =
    user;

  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error(
        "Error sending request:",
        err.response?.data?.message || err.message
      );
    }
  };

  return (
    <div className="card bg-base-200 w-96 shadow-xl">
      <figure>
        <img src={photoUrl} alt="UserPicture" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + " | " + gender}</p>}

        <p>{about}</p>

        {/* skills */}

        <div className="flex flex-wrap gap-2 mt-2">
          {Array.isArray(skills) && skills.length > 0 ? (
            skills.map((skill, index) => (
              <span
                key={index}
                className="bg-warning text-white px-2 py-1 rounded-md text-sm"
              >
                {skill}
              </span>
            ))
          ) : (
            <p>No skills added</p>
          )}
        </div>

        <div className="card-actions justify-between my-4">
          <button
            onClick={() => handleSendRequest("ignored", _id)}
            className="btn btn-error text-neutral-content font-bold"
          >
            Ignore ❌
          </button>
          <button
            onClick={() => handleSendRequest("interested", _id)}
            className="btn btn-primary text-neutral-content font-bold"
          >
            Interested 💚
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
