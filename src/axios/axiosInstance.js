import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, // Use environment variable
});

// Request interceptor to add the authorization token to every request
axiosInstance.interceptors.request.use(
  config => {
    // Get the token from local storage (or any other method)
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // Handle specific response errors (e.g., 401, 403, etc.)
    if (error.response.status === 401) {
      // Handle unauthorized errors (e.g., redirect to login)
      console.error('Unauthorized access - maybe redirect to login?');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;