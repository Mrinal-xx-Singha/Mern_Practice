import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../store/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      dispatch(addConnections(res.data?.data));
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center bg-base-200">
        <span className="loading loading-spinner text-primary w-16 h-16"></span>
      </div>
    );
  }

  if (!connections || connections.length === 0) {
    return (
      <div className="h-screen flex flex-col justify-center items-center bg-base-200">
        <p className="text-info font-bold text-2xl">Start Connecting 🤝</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 py-10">
      <h1 className="text-primary font-bold text-center text-3xl mb-6">
        Connections
      </h1>

      <div className="container mx-auto grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 px-4">
        {connections.map((connection) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            connection;

          return (
            <div
              key={_id}
              className="card bg-base-200 shadow-xl border border-secondary rounded-lg p-4 flex flex-row items-center gap-6 hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Profile Image */}
              <figure className="w-24 h-24">
                <img
                  src={photoUrl}
                  alt={`${firstName} ${lastName}`}
                  className="rounded-full border-2 border-primary object-cover w-full h-full"
                />
              </figure>

              {/* User Details */}
              <div className="flex flex-col">
                <h2 className="text-primary font-bold text-lg">
                  {firstName} {lastName}
                </h2>
                <p className="text-neutral-content text-sm">{about}</p>
                <p className="text-sm text-neutral-content">Age: {age}</p>
                <p className="text-sm text-neutral-content capitalize">
                  Gender: {gender}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
