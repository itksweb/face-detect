"use client";
import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./auth-slice";
import detectSliceReducer from "./detect-slice";

const store = configureStore({
  reducer: { auth: authSliceReducer, detect: detectSliceReducer },
});

export default store;
