
import axiosClient from '../utils/axiosClient';

const CheckpointService = {
    getCheckpointById: async (id) => {
        try {
            const response = await axiosClient.get(`/tour-checkpoints/${id}`)
            return response.response
        } catch (error) {
            console.log("Error fetch checkpointById", error);
            
        }
    }

}

export default CheckpointService