import { createSlice } from "@reduxjs/toolkit";
import {
  login,
  signUp,
  getProfile,
  updateProfile,
} from "../actions/authActions";

const tokenFromStorage = localStorage.getItem("jwt");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: tokenFromStorage ? true : false,
    user: null,
    token: tokenFromStorage,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;

      state.loading = false;
      state.error = null;
      // Supprimez le token du localStorage
      localStorage.removeItem("jwt");
    },
    setUserToken: (state, action) => {
      state.token = action.payload; // définit le token
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        console.log("*** ACTION LOGIN", action); // pour voir la structure de l'action
        if (action.payload && action.payload.token) {
          state.isAuthenticated = true;
          state.token = action.payload.token;
          state.user = action.payload.user;

          if (action.payload && action.payload.token) {
            localStorage.setItem("jwt", action.payload.token);
          }
        } else {
          console.error(
            "Unexpected format of the login response",
            action.payload
          );
        }
      })
      .addCase(signUp.fulfilled, (state, action) => {
        console.log("FULLFILLED");
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
