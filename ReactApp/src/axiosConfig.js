// src/axiosConfig.js
import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: `${process.env.base_url}`,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the token from local storage or wherever you store it
    const token = localStorage.getItem('token');
    
    // If the token exists, attach it to the headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Handle the error
    return Promise.reject(error);
  }
);

export default axiosInstance;
