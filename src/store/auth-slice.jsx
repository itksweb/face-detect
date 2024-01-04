"use client";
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    showLogin: false,
    isLogin: true,
    isLoading: false,
    profile: {},
    test: "tested",
  },
  reducers: {
    login(state, action) {
      //state.isLoading = true;
      state.isAuthenticated = true;
      state.showLogin = false;
      state.profile = action.payload;
      console.log(state.profile);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.profile = {};
    },

    seeLogin(state) {
      state.showLogin = true;
    },
    switchForm(state, action) {
      state.isLogin = action.payload ? action.payload : !state.isLogin;
    },
    setProfile(state, action) {
      state.profile = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
