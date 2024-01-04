"use client";
import { createSlice } from "@reduxjs/toolkit";

const calculateFaceLocation = (data) => {
  const image = document.getElementById("imgee");
  if (data.length !== 0) {
    let all = [];
    for (const box of data) {
      let data = box.region_info.bounding_box;
      let item = {
        id: box.id,
        box: {
          left: (data.left_col * image.width).toFixed(1) + "px",
          top: (data.top_row * image.height).toFixed(1) + "px",
          right: (image.width - data.right_col * image.width).toFixed(1) + "px",
          bottom:
            (image.height - data.bottom_row * image.height).toFixed(1) + "px",
        },
      };
      all = [...all, item];
    }
    return all;
  }
};

const detectSlice = createSlice({
  name: "detect",
  initialState: { imageUrl: "", faceLocation: [] },
  reducers: {
    setImage(state, action) {
      state.imageUrl = action.payload;
    },
    updateFaceLocation(state, action) {
      state.faceLocation = action.payload
        ? calculateFaceLocation(action.payload)
        : [];
    },
  },
});

export const detectActions = detectSlice.actions;
export default detectSlice.reducer;
