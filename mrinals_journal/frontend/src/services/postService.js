import axios from "axios";

const API_URL = "https://mern-practice-o3a9.onrender.com/api/posts";
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
    }
  );
  return res.data;
};

export const deletePost = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`, {
    withCredentials: true,
  });
  return res.data
};
