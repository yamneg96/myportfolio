import axios from 'axios';

// Basic Axios instance for API interactions
export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Optionally setup interceptors for auth tokens here in the future
api.interceptors.request.use(
    (config) => {
        // e.g. const token = localStorage.getItem('token');
        // if (token) config.headers.Authorization = `Bearer ${token}`
        return config;
    },
    (error) => Promise.reject(error)
);
