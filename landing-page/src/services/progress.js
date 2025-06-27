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
    }
}

export default progressService;