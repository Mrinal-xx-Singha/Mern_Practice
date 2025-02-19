import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../store/feedSlice";
import UserCard from "./UserCard";
const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  useEffect(() => {
    const getFeed = async () => {
      // Fetch only if feed is undefined or empty
      if (feed && feed.length > 0) return;

      try {
        setLoading(true);
        const res = await axios.get(BASE_URL + "/user/feed", {
          withCredentials: true,
        });
        console.log(res.data?.data);
        if (res.data?.data.length > 0) {
          dispatch(addFeed(res.data?.data));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getFeed();
  }, [feed, dispatch]);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center bg-base-200">
        <span className="loading loading-spinner text-primary w-16 h-16"></span>
      </div>
    );
  }

  if (!feed || feed.length === 0 || currentIndex >= feed.length) {
    return <div className="flex justify-center py-10 h-[80vh]">
      <span className="md:text-3xl font-semibold text-primary sm:text-sm py-10">No users found💀</span> 
      </div>;
  }

  const handleNextUser = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };
  return (
    feed && (
      <div className="min-h-screen bg-base-100 flex items-center justify-center py-10 pb-4">
        <UserCard user={feed[currentIndex]} onAction={handleNextUser} />
      </div>
    )
  );
};

export default Feed;
