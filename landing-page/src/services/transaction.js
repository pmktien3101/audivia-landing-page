import axiosClient from '../utils/axiosClient';

const TransactionService = {

    getRevenueAdmin : async () => {
        try {
            const result = await axiosClient.get("/transaction-histories/admin")
            console.log('REVENUE',result)
            return result
        } catch (err){
            console.log("Error fetching transaction admin", err);
            return [];
        }
    },


    createNewTransactionHistory: async (userId, tour) => {
        const params = {
          userId,
          tourId: tour?.id,
          amount: Number(tour?.price),
          description: tour?.title,
          type: "purchase",
          status: "success"
        }
        console.log(params);
        
        await axiosClient.post(`/transaction-histories`, params)

      },

      getHistoryTransactionByUserId: async (userId) => {
        try {
          const response = await axiosClient.get(`/transaction-histories/transaction/${userId}`);
          return response;
        } catch (error) {
          console.error('Error fetching history transaction:', error);
          throw error;
        }
      }   


}
export default TransactionService