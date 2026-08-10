import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import postReducer from "./slices/postSlice";
import jobReducer from "./slices/jobSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    jobs: jobReducer
  },
});

export default store;
