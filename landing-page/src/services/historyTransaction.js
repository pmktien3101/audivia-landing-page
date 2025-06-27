import axiosClient from '../utils/axiosClient';

const HistoryTransaction = {
    checkUserPurchasedTour: async (userId, tourId) => {
        try {
            const response = await axiosClient.get(`/transaction-histories/user/${userId}/tour/${tourId}`);
            return response
        } catch (error) {
            console.log('Error at check user purchased tour: ', error);
            
        }
    },
    
    updateAudioCharacterId: async (id, audioCharacterId) => {
        try {
            const response = await axiosClient.put(`/transaction-histories/character/${id}`, {
                audioCharacterId
              })
            return response;
        } catch (error) {
            console.error('Error updating audio character:', error);
            throw error;
        }
    }
}

export default HistoryTransaction