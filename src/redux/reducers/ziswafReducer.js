import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryZakat: [],
};

const authSlice = createSlice({
  name: "ziswaf",
  initialState,
  reducers: {
    setCategoryZakat: (state, action) => {
      state.categoryZakat = action.payload;
    },
  },
});

export const { setCategoryZakat } = authSlice.actions;

export default authSlice.reducer;
