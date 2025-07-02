import axiosClient from '../utils/axiosClient';

const tourCheckpointService = {
    getTourCheckpointById: async (checkpointId) => {
        try {
            const response = await axiosClient.get(`/tour-checkpoints/${checkpointId}`);
            return response.response
        } catch (error) {
            console.error("Error fetching tour checkpoint", error);

        }
    }
}
export default tourCheckpointService;