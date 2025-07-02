import axiosClient from '../utils/axiosClient';

const progressService = {
    updateTourProgress: async (id, progressData) => {
        try {
            const response = await axiosClient.put(`/user-tour-progress/${id}`, progressData);
            return response;
        } catch (error) {
            console.error('Lỗi khi cập nhật tour progress:', error);
            throw error;
        }
    },
    getTourProgress: async (userId, tourId) => {
        try {
            const response = await axiosClient.get(`/user-tour-progress/users/${userId}/tours/${tourId}`);
            return response;
        } catch (error) {
            console.error('Lỗi khi lấy tour progress:', error);
            throw error;
        }
    },
    getTourProgressById: async (id) => {
        try {
            const response = await axiosClient.get(`/user-tour-progress/${id}`);
            return response.data;
        } catch (error) {
            console.error('Lỗi khi lấy tour progress:', error);
            throw error;
        }
    },
    updateTourProgress: async (id, progressData) => {
        try {
            const response = await axiosClient.put(`/user-tour-progress/${id}`, progressData);
            return response.data;
        } catch (error) {
            console.error('Lỗi khi cập nhật tour progress:', error);
            throw error;
        }
    },
    createTourProgress: async (progressData) => {
        try {
            const response = await axiosClient.post(`/user-tour-progress`, progressData);
            return response.data;
        } catch (error) {
            console.error('Lỗi khi tạo tour progress:', error);
            throw error;
        }
    },
    getCheckpointProgressById: async (id) => {
        try {
            const response = await axiosClient.get(`/user-checkpoint-progress/${id}`);
            return response.data;
        } catch (error) {
            console.error('Lỗi khi lấy checkpoint progress:', error);
            throw error;
        }
    },
    updateCheckpointProgress: async (id, progressData) => {
        try {
            const response = await axiosClient.put(`/user-checkpoint-progress/${id}`, progressData);
            return response.data;
        } catch (error) {
            console.error('Lỗi khi cập nhật checkpoint progress:', error);
            throw error;
        }
    },
    createCheckpointProgress: async (progressData) => {
        try {
            const response = await axiosClient.post(`/user-checkpoint-progress`, progressData);
            return response.data;
        } catch (error) {
            console.error('Lỗi khi tạo checkpoint progress:', error);
            throw error;
        }
    },
    getByTourProgressAndCheckpoint: async (tourProgressId, checkpointId) => {
        try {
            const response = await axiosClient.get(`/user-checkpoint-progress/tour-progress/${tourProgressId}/checkpoints/${checkpointId}`);
            return response.data;
        } catch (error) {
            console.error('Lỗi khi lấy checkpoint progress theo tour progress và checkpoint:', error);
            throw error;
        }
    }
}

export default progressService;