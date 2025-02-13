// src/api/axiosInstance.js

import axios from 'axios';
import store from '../store/store';
import { refreshToken, logout} from '../store/authSlice';

const apiClient = axios.create({
  baseURL: 'https://dummyjson.com',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
});

// Add a request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.token;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is due to an expired token
    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent infinite loop
      const state = store.getState();
      const refreshTokenValue = state.auth.refreshToken;

      try {
        const refreshResponse = await store.dispatch(refreshToken(refreshTokenValue)).unwrap();
        const newToken = refreshResponse.accessToken;

        // Update the original request with the new token
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return apiClient(originalRequest); // Retry the original request
      } catch (refreshError) {
        // Handle refresh token failure (e.g., log out the user)
        console.error("Refresh token failed:", refreshError);
        store.dispatch(logout()); // Log out the user
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;