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

    loginWithGoogle: async (googleToken) => {
        try {
            const response = await axiosClient.post('/auth/google-login', {
                token: googleToken,
            });

            const { accessToken, refreshToken } = response;

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            return response;
        } catch (error) {
            console.error('Google login failed:', error);
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
    },
    getAllMembers: async () => {
        try {
            const response = await axiosClient.get('/users');
            return response
        } catch (error) {
            throw error;
        }
    },

    getUserFriends: async (userId) => {
        try {
            const response = await axiosClient.get(`/user-follows/friends?userId=${userId}`);
            return response.response;
        } catch (error) {
            console.error('Lỗi lấy danh sách bạn bè:', error);
            throw error;
        }
    },

    getUserById: async (userId) => {
        try {
            const response = await axiosClient.get(`/users/${userId}`);
            return response;
        } catch (error) {
            throw error;
        }
    }
};

export default userService;