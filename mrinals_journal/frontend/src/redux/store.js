import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import postReducer from "./slices/postSlice";
import counterReducer from "./slices/counterSlice";
const store = configureStore({
  reducer: {
    // the reducer to create a localized store for count and countner
    count: counterReducer,
    auth: authReducer,
    posts: postReducer,
  },
});

export default store;
