import axios from "axios";
const API_URL = "http://localhost:5000/api/comments";

export const getCommentsByPostId = async (postId) => {
  const res = await axios.get(`${API_URL}/post/${postId}`);
  return res.data;
};

export const addComment = async (postId, content, parentId = null) => {
  const res = await axios.post(
    `${API_URL}/${postId}`,
    { content, parentId },
    { withCredentials: true }
  );
  return res.data;
};

export const deleteComment = async (commentId) => {
  const res = await axios.delete(`${API_URL}/${commentId}`, {
    withCredentials: true,
  });
  return res.data;
};
