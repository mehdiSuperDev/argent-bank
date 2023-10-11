import axios from "axios";

const API_URL = "http://localhost:3001/user";

export const login = (email, password) => {
  return axios.post(`${API_URL}/login`, { email, password });
};

export const signup = (email, password, firstName, lastName) => {
  return axios.post(`${API_URL}/signup`, {
    email,
    password,
    firstName,
    lastName,
  });
};

export const fetchProfile = (token) => {
  return axios.get(`${API_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateProfile = (token, firstName, lastName) => {
  return axios.put(
    `${API_URL}/profile`,
    { firstName, lastName },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};
