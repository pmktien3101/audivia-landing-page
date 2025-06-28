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
        
        const response = await axiosClient.post(`/transaction-histories`, params)
        // console.log(response)
      },
}
export default TransactionService