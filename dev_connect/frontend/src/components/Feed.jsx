import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../store/feedSlice";
import UserCard from "./userCard";
const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;

    try {
      setLoading(true);
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      console.log(res.data);

      dispatch(addFeed(res.data));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center bg-base-200">
        <span className="loading loading-spinner text-primary w-16 h-16"></span>
      </div>
    );
  }

  if (!feed) return;
  if (feed.length <= 0 || currentIndex >= feed.length)
    return <h1 className="flex justify-center my-10">No users found </h1>;

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
