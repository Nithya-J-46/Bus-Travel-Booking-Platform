import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const api = axios.create({
  baseURL: 'http://localhost:8000/api/auth',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize authentication from storage
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
      const storedRefreshToken = localStorage.getItem('refresh_token') || sessionStorage.getItem('refresh_token');
      const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  // Axios interceptors inside AuthProvider so it can reference token/setToken/logout
  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        const activeToken = token || localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
        if (activeToken) {
          config.headers.Authorization = `Bearer ${activeToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          
          const remember = !!localStorage.getItem('refresh_token');
          const refreshToken = remember 
            ? localStorage.getItem('refresh_token') 
            : sessionStorage.getItem('refresh_token');

          if (refreshToken) {
            try {
              // Call simple-jwt refresh endpoint
              const response = await axios.post('http://localhost:8000/api/auth/token/refresh/', {
                refresh: refreshToken,
              });
              const newAccessToken = response.data.access;
              
              setToken(newAccessToken);
              if (remember) {
                localStorage.setItem('access_token', newAccessToken);
              } else {
                sessionStorage.setItem('access_token', newAccessToken);
              }
              
              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
              return api(originalRequest);
            } catch (refreshError) {
              // If refresh token is expired, log out
              logout();
            }
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [token]);

  const login = async (email, password, rememberMe) => {
    const response = await api.post('/login/', { email, password });
    const { access, refresh, user: userData } = response.data;
    
    setToken(access);
    setUser(userData);

    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem('access_token', access);
    storage.setItem('refresh_token', refresh);
    storage.setItem('user', JSON.stringify(userData));

    return response.data;
  };

  const register = async (email, fullName, mobileNumber, password, confirmPassword, acceptTerms) => {
    const response = await api.post('/register/', {
      email,
      full_name: fullName,
      mobile_number: mobileNumber,
      password,
      confirm_password: confirmPassword,
      accept_terms: acceptTerms,
    });
    return response.data;
  };

  const logout = async () => {
    const remember = !!localStorage.getItem('refresh_token');
    const refreshToken = remember 
      ? localStorage.getItem('refresh_token') 
      : sessionStorage.getItem('refresh_token');

    try {
      if (refreshToken) {
        await api.post('/logout/', { refresh: refreshToken });
      }
    } catch (e) {
      console.error("Logout API error:", e);
    } finally {
      setToken(null);
      setUser(null);
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
      sessionStorage.removeItem('access_token');
      sessionStorage.removeItem('refresh_token');
      sessionStorage.removeItem('user');
    }
  };

  const updateProfile = async (formData) => {
    const response = await api.patch('/profile/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    const updatedUser = response.data.user;
    setUser(updatedUser);
    
    const remember = !!localStorage.getItem('access_token');
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem('user', JSON.stringify(updatedUser));
    
    return response.data;
  };

  const changePassword = async (oldPassword, newPassword, confirmPassword) => {
    const response = await api.post('/change-password/', {
      old_password: oldPassword,
      new_password: newPassword,
      confirm_password: confirmPassword,
    });
    return response.data;
  };

  const forgotPassword = async (email) => {
    const response = await api.post('/forgot-password/', { email });
    return response.data;
  };

  const resetPassword = async (uidb64, token, newPassword, confirmPassword) => {
    const response = await api.post('/reset-password/', {
      uidb64,
      token,
      new_password: newPassword,
      confirm_password: confirmPassword,
    });
    return response.data;
  };

  const verifyEmail = async (uidb64, token) => {
    const response = await api.post('/verify-email/', { uidb64, token });
    return response.data;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        updateProfile,
        changePassword,
        forgotPassword,
        resetPassword,
        verifyEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
