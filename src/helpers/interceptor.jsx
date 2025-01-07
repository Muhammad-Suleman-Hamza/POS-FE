import axios from 'axios';
import { getSessionStorage } from './storage';

// Axios instance
const interceptor = axios.create({
    timeout: 10000
});

// Request interceptor
interceptor.interceptors.request.use(
    (config) => {
        // Attach token to the Authorization header
        const token = getSessionStorage('sessionToken');
        config.headers.Authorization = `Bearer ${token}`;

        // Log the request
        console.log('Request:', config);

        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor
interceptor.interceptors.response.use(
    (response) => {
        // Log the response
        console.log('Response:', response);
        return response;
    },
    (error) => {
        console.error('Response error:', error);

        if (error.response && error.response.status === 401) {
            console.error('Token expired or unauthorized, redirecting to login...');
            window.location.href = '/login';
        }

        return Promise.reject(error);
    }
);

export default interceptor;
