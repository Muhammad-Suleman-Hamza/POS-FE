import axios from 'axios';
import { toast } from 'react-toastify';
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
        const response = `Request error :: ${error}`;

        toast.error(response);
        console.error(response);
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
        let response = `Response error: :: ${error}`;
        const authCheck = error.response && error.response.status === 401;
        if(authCheck) response = 'Token expired or unauthorized, redirecting to login';

        toast.error(response);
        console.error(response);
        if (authCheck) window.location.href = '/login';
  
        return Promise.reject(error);
    }
);

export default interceptor;
