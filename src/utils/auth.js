import axios from 'axios';

// Set base URL for Axios
axios.defaults.baseURL = import.meta.env.VITE_REACT_APP_API_URL;

// Store tokens in localStorage
export const setAuthTokens = ({ accessToken, refreshToken }) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
};

// Clear tokens
export const clearAuthTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  delete axios.defaults.headers.common['Authorization'];
};

// Get access token
export const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};