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

export const fetchMoreFromAuthor = createAsyncThunk(
  "posts/moreFromAuthor",
  async ({ authorId, exclude }, thunkAPI) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/posts/author/${authorId}?exclude=${exclude}`
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/delete",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`);
      return id;
    } catch (error) {
      thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState: { posts: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((p) => p._id !== action.payload);
      });
  },
});

export default postSlice.reducer;
