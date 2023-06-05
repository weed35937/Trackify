import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  role: null
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.currentUser = action.payload.user;
      state.role = action.payload.user.role;
      localStorage.setItem("trackify-token", action.payload.token);
    },
    logout: (state) => {
      state.currentUser = null;
      state.role = null;
      localStorage.removeItem("trackify-token");
    }
  }
});

export const { loginSuccess, logout } = userSlice.actions;

export default userSlice.reducer;
