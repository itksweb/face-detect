"use client";
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    isLoading: false,
    profile: {},
  },
  reducers: {
    login(state, action) {
      //state.isLoading = true;
      state.isAuthenticated = true;
      state.showLogin = false;
      state.profile = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.profile = {};
    },

    setProfile(state, action) {
      state.profile = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
