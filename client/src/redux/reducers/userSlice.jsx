import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  role: null,
  loading: false,
  error: false
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload.user;
      state.role = action.payload.user.role;
      localStorage.setItem("trackify-token", action.payload.token);
    },
    logout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
      localStorage.removeItem("trackify-token");
    }
  }
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  displayPodcastFailure,
  subscription,
  verified
} = userSlice.actions;

export default userSlice.reducer;
