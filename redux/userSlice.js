import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    token: null,
    pending: false,
    error: false,
    isLoggedIn: false,
  },
  reducers: {
    updateStart: (state) => {
      state.pending = true;
      state.isLoggedIn = false;
    },
    updateSuccess: (state, action) => {
      state.pending = false;
      state.isLoggedIn = true;
      state.token = action.payload;
    },
    updateError: (state) => {
      state.error = true;
      state.isLoggedIn = false;
      state.pending = false;
    },
    logoutStart: (state) => {
      state.pending = true;
      state.isLoggedIn = true;
    },
    logoutSuccess: (state) => {
      state.pending = false;
      state.isLoggedIn = false;
      state.token = null;
    },
    logoutError: (state) => {
      state.pending = false;
      state.isLoggedIn = true;
    },
  },
});

export const {
  updateStart,
  updateSuccess,
  updateError,
  logoutStart,
  logoutSuccess,
  logoutError,
} = userSlice.actions;

export default userSlice.reducer;
