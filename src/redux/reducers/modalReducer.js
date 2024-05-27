import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  showSideBar: false,
  showLogout: false,
};
const authSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setShowSideBar: (state, action) => {
      state.showSideBar = action.payload;
    },
    setShowLogout: (state, action) => {
      state.showLogout = action.payload;
    },
  },
});

export const { setShowLogout, setShowSideBar } = authSlice.actions;

export default authSlice.reducer;
