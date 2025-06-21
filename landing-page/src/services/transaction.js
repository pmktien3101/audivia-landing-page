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
    }
}
export default TransactionService