import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants.js";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../store/requestSlice";
import toast from "react-hot-toast";

const Request = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests", {
        withCredentials: true,
      });
      dispatch(addRequest(res.data?.data));
      if (res.status !== 200) {
        toast.error(res.data.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return null;

  if (requests.length === 0)
    return (
      <div className="h-screen flex flex-col justify-center items-center bg-base-100">
        <h1 className="text-gray-600 font-semibold text-2xl">
          No Requests Found
        </h1>
      </div>
    );

  return (
    <div className="min-h-screen bg-bas-100 py-10 bg-base-100">
      <h1 className="text-primary font-bold text-center text-3xl mb-6">
        Connection Requests
      </h1>

      <div className="container mx-auto grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4">
        {requests.map((request) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            request?.fromUserId;

          return (
            <div
              key={_id}
              className="card bg-bg-base-200 shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition duration-300"
            >
              <div className="flex items-center gap-4 p-4">
                {/* Profile Image */}
                <div className="w-20 h-20">
                  <img
                    src={photoUrl}
                    alt={`${firstName} ${lastName}`}
                    className="rounded-full size-full object-cover border-2 border-gray-200"
                  />
                </div>

                {/* User Details */}
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-primary">
                    {firstName} {lastName}
                  </h2>
                  <p className="text-neutral-content text-sm pt-2">{about}</p>
                  <p className="text-neutral-content text-xs pt-2">
                    Age: {age} | {gender}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between gap-2 px-4 pb-4">
                <button className="btn btn-error text-neutral-content px-4 py-1 rounded-lg hover:bg-red-600 transition font-bold">
                  Ignore ❌
                </button>
                <button className="btn btn-primary text-neutral-content px-4 py-1 rounded-lg hover:bg-green-600 transition font-bold">
                  Interested 💚
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Request;
