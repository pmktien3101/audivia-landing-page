import axiosClient from '../utils/axiosClient';

const userService = {
    login: async (email, password) => {
        try {
            const response = await axiosClient.post('/auth/login', {
                email,
                password
            });
            if (response.accessToken) {
                localStorage.setItem('accessToken', response.accessToken);
            }
            return response;
        } catch (error) {
            throw error;
        }
    },

    logout: () => {
        localStorage.removeItem('accessToken');
    },

    getCurrentUser: async () => {
        try {
            const response = await axiosClient.get('/auth/profile');
            return response;
        } catch (error) {
            throw error;
        }
    }
};

export default userService;