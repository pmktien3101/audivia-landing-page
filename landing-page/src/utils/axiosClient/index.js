import axios from 'axios';
import ROUTES from '../routes';

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        if (error.response) {
            // Handle specific error cases
            if (error.response.status === 401) {
                // Handle unauthorized access
                localStorage.removeItem('accessToken');
                window.location.href = ROUTES.LOGIN;
            }
            return Promise.reject(error.response.data);
        }
        return Promise.reject(error);
    }
);

export default axiosClient;
