import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { username: null, token: null },
  reducers: {
    setCredentials: (state, action) => {
      const { data } = action.payload;
      state.username = data.username;
      state.token = data.token;
    },
    logOut: (state, action) => {
      state.username = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUsername = (state) => state.auth.username;
export const selectCurrentToken = (state) => state.auth.token;
