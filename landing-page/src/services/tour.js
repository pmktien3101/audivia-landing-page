import axiosClient from '../utils/axiosClient';

const tourService = {
    getAllTours: async(pageIndex = 1, pageSize = 5) => {
        try {
            const response = await axiosClient.get('/tours', {
                params: { pageIndex, pageSize }
            });
            console.log('TOUR', response)
            return response.response.data
        } catch (error) {
            throw error;
        }
    },
    createTour: async (tourData) => {
        try {
            const response = await axiosClient.post('/tours', tourData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    updateTour: async (id,tourData) => {
        try {
            await axiosClient.put(`/tours/${id}`, tourData);
        } catch (error) {
            throw error;
        }
    },
    deleteTour: async (id) => {
        try {
            await axiosClient.delete(`/tours/${id}`);
        } catch (error) {
            throw error;
        }
    },
    getTourTypes: async () => {
        try {
            const response = await axiosClient.get('/tour-types');
            console.log('TYPE',response)
            return response.response;
        } catch (error) {
            throw error;
        }
    },
};

export default tourService;