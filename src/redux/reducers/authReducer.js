import { createSlice } from "@reduxjs/toolkit";
import {
  login,
  signUp,
  getProfile,
  updateProfile,
} from "../actions/authActions";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: null,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        console.log("FULLFILLED");
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.user = action.payload; // {id, email}
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload; // {id, email}
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
