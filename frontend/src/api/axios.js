import axios from 'axios';

const baseURL = "https://bus-travel-booking-platform-1.onrender.com/api/";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to attach JWT token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor to handle token refresh on 401 Unauthorized
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and it's not a retry
    if (error.response?.status === 401 && !originalRequest._retry && originalRequest.url !== 'auth/token/refresh/') {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
          throw new Error('No refresh token');
        }

        // Try to get a new access token
        const response = await axios.post(`${baseURL}auth/token/refresh/`, {
          refresh: refreshToken
        });

        const { access } = response.data;

        // Save new access token
        localStorage.setItem('access_token', access);

        // Update header and retry original request
        originalRequest.headers['Authorization'] = `Bearer ${access}`;
        return axiosInstance(originalRequest);

      } catch (refreshError) {
        // If refresh fails, log out the user
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');

        // Prevent infinite redirect loop if already on an auth page
        const authPages = ['/login', '/register', '/forgot-password', '/reset-password', '/verify-email'];
        if (!authPages.includes(window.location.pathname)) {
          window.location.href = '/login';
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
