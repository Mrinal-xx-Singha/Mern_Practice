import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

export const fetchPosts = createAsyncThunk(
  "posts/fetch",
  async (query = "", thunkAPI) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/posts${query}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createPost = createAsyncThunk(
  "posts/create",
  async (data, thunkAPI) => {
    try {
      const res = axios.post("http://localhost:5000/api/posts", data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
