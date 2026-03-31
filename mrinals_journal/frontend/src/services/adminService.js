import axios from "axios";
import { API_BASE_URL } from "../config/api";

export const getAllUsers = async () => {
  const res = await axios.get(`${API_BASE_URL}/api/admin/users`, {
    withCredentials: true,
  });
  return res.data;
};

export const updateUserRole = async (id, role) => {
  const res = await axios.patch(
    `${API_BASE_URL}/api/admin/users/${id}/role`,
    { role },
    { withCredentials: true },
  );
  return res.data;
};

export const deleteUser = async (id) => {
  const res = await axios.delete(`${API_BASE_URL}/api/admin/users/${id}`, {
    withCredentials: true,
  });
  return res.data;
};
