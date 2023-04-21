import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { username: null, token: null, name: null },
  reducers: {
    setCredentials: (state, action) => {
      const { data } = action.payload;
      state.username = data.username;
      state.name = data.name;
      state.token = data.token;
    },
    logOut: (state, action) => {
      state.username = null;
      state.token = null;
      state.name = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUsername = (state) => state.auth.username;
export const selectCurrentName = (state) => state.auth.name;
export const selectCurrentToken = (state) => state.auth.token;
