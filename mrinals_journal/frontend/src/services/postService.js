import axios from "axios";
import { API_BASE_URL } from "../config/api";

const API_URL = `${API_BASE_URL}/api/posts`;

export const getPostById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

export const reactToPost = async (postId, emoji) => {
  const res = await axios.patch(
    `${API_URL}/react/${postId}`,
    { emoji },
    {
      withCredentials: true,
    },
  );
  return res.data;
};

export const toggleBookmark = async (id) => {
  const res = await axios.patch(
    `${API_URL}/bookmark/${id}`,
    {},
    {
      withCredentials: true,
    },
  );
  return res.data;
};
