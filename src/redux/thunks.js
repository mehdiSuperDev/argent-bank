import {
  loginRequest,
  loginSuccess,
  loginFailure,
  signupRequest,
  signupSuccess,
  signupFailure,
  fetchProfileRequest,
  fetchProfileSuccess,
  fetchProfileFailure,
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFailure,
} from "./actions";
import * as api from "./api";

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const response = await api.login(email, password);
    const data = response.data;
    localStorage.setItem("jwt", data.token); // stocker le JWT dans localStorage
    dispatch(loginSuccess(data));
  } catch (error) {
    dispatch(loginFailure(error.response.data.message));
  }
};

export const signupUser =
  (email, password, firstName, lastName) => async (dispatch) => {
    try {
      dispatch(signupRequest());
      const response = await api.signup(email, password, firstName, lastName);
      dispatch(signupSuccess(response.data));
    } catch (error) {
      dispatch(signupFailure(error.response.data.message));
    }
  };

export const fetchUserProfile = () => async (dispatch) => {
  try {
    dispatch(fetchProfileRequest());
    const token = localStorage.getItem("jwt");
    const response = await api.fetchProfile(token);
    dispatch(fetchProfileSuccess(response.data.body));
  } catch (error) {
    dispatch(fetchProfileFailure(error.response.data.message));
  }
};

export const updateUserProfile = (firstName, lastName) => async (dispatch) => {
  try {
    dispatch(updateProfileRequest());
    const token = localStorage.getItem("jwt");
    const response = await api.updateProfile(token, firstName, lastName);
    dispatch(updateProfileSuccess(response.data.body));
  } catch (error) {
    dispatch(updateProfileFailure(error.response.data.message));
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("jwt");
  dispatch(logout());
};
