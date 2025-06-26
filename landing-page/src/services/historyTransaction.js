import axiosClient from '../utils/axiosClient';

const HistoryTransaction = {
    checkUserPurchasedTour: async (userId, tourId) => {
        try {
            const response = await axiosClient.get(`/transaction-histories/user/${userId}/tour/${tourId}`);
            return response
        } catch (error) {
            console.log('Error at check user purchased tour: ', error);
            
        }
    }
}

export default HistoryTransaction