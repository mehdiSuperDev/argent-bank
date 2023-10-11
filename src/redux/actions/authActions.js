import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const login = createAsyncThunk("auth/login", async (credentials, _) => {
  try {
    const response = await api.post("/user/login", credentials);
    if (response.data && response.data.body && response.data.body.token) {
      localStorage.setItem("jwt", response.data.body.token);
      return {
        token: response.data.body.token,
        user: { email: credentials.email },
      };
    }
  } catch (error) {
    console.error(error);
    throw error; // rethrow l'erreur pour la capturer plus tard dans un composant
  }
});

export const signUp = createAsyncThunk(
  "auth/signup",
  async (userDetails, _) => {
    try {
      const response = await api.post("/user/signup", userDetails);
      return response.data.body;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const getProfile = createAsyncThunk(
  "auth/getProfile",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    try {
      const response = await api.post("/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.body;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (updatedDetails, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    try {
      const response = await api.put("/user/profile", updatedDetails, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.body;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const setUserToken = createAsyncThunk(
  "auth/setUserToken",
  async (token, thunkAPI) => {
    thunkAPI.dispatch({
      type: "auth/setUserToken",
      payload: token,
    });
  }
);
