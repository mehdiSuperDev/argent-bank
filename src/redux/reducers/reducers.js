import * as actionTypes from "./actionTypes";

const initialState = {
  isLoggedIn: false,
  user: null,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
    case actionTypes.SIGNUP_REQUEST:
    case actionTypes.FETCH_PROFILE_REQUEST:
    case actionTypes.UPDATE_PROFILE_REQUEST:
      return { ...state, loading: true, error: null };
    case actionTypes.LOGIN_SUCCESS:
    case actionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
        loading: false,
      };
    case actionTypes.FETCH_PROFILE_SUCCESS:
    case actionTypes.UPDATE_PROFILE_SUCCESS:
      return { ...state, user: action.payload, loading: false };
    case actionTypes.LOGIN_FAILURE:
    case actionTypes.SIGNUP_FAILURE:
    case actionTypes.FETCH_PROFILE_FAILURE:
    case actionTypes.UPDATE_PROFILE_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case actionTypes.LOGOUT:
      return { ...state, isLoggedIn: false, user: null };
    default:
      return state;
  }
};

export default authReducer;
