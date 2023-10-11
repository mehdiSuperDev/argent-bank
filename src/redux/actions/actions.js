import * as actionTypes from "./actionTypes";

// Connexion
export const loginRequest = () => ({ type: actionTypes.LOGIN_REQUEST });
export const loginSuccess = (data) => ({
  type: actionTypes.LOGIN_SUCCESS,
  payload: data,
});
export const loginFailure = (error) => ({
  type: actionTypes.LOGIN_FAILURE,
  payload: error,
});

// Déconnexion
export const logout = () => ({ type: actionTypes.LOGOUT });

// SignUp
export const signupRequest = () => ({ type: actionTypes.SIGNUP_REQUEST });
export const signupSuccess = (data) => ({
  type: actionTypes.SIGNUP_SUCCESS,
  payload: data,
});
export const signupFailure = (error) => ({
  type: actionTypes.SIGNUP_FAILURE,
  payload: error,
});

// Profil
export const fetchProfileRequest = () => ({
  type: actionTypes.FETCH_PROFILE_REQUEST,
});
export const fetchProfileSuccess = (data) => ({
  type: actionTypes.FETCH_PROFILE_SUCCESS,
  payload: data,
});
export const fetchProfileFailure = (error) => ({
  type: actionTypes.FETCH_PROFILE_FAILURE,
  payload: error,
});

// Mise a jour du profil
export const updateProfileRequest = () => ({
  type: actionTypes.UPDATE_PROFILE_REQUEST,
});
export const updateProfileSuccess = (data) => ({
  type: actionTypes.UPDATE_PROFILE_SUCCESS,
  payload: data,
});
export const updateProfileFailure = (error) => ({
  type: actionTypes.UPDATE_PROFILE_FAILURE,
  payload: error,
});
