import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSignin: false,
  username: null,
  token: null,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    rdSetIsSignin: (state, action) => {
      state.isSignin = action.payload;
    },
    rdSetUsername: (state, action) => {
      state.username = action.payload;
    },
    rdSetToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { rdSetIsSignin, rdSetUsername, rdSetToken } =
  counterSlice.actions;
export default counterSlice.reducer;
