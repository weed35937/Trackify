import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  role: null,
  darkMode: true,
  reload: false
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
    updateUser: (state, action) => {
      state.currentUser = action.payload.user;
    },
    loginSuccess: (state, action) => {
      state.currentUser = action.payload.user;
      state.role = action.payload.user.role;
      localStorage.setItem("trackify-token", action.payload.token);
    },
    logout: (state) => {
      state.currentUser = null;
      state.role = null;
      localStorage.removeItem("trackify-token");
    },
    reload: (state) => {
      state.reload = !state.reload;
    }
  }
});

export const { updateUser, setDarkMode, loginSuccess, logout, reload } =
  userSlice.actions;

export default userSlice.reducer;
