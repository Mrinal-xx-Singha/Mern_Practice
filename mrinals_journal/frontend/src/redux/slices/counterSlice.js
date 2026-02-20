import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  initialState: 0,
  name: "counter",
  increment: (state, action) => {
    state.value += action.payload;
  },
  decrement: (state, action) => {
    state.value -= action.payload;
  },
});

export default counterSlice.reducer;
