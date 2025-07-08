import axiosClient from '../utils/axiosClient';
import axios from 'axios';

const PaymentService = {

  createPaymentIntent: async (user, amount, description) => {
    const response = await axiosClient.post(`/payment/vietqr`, {
      userId: user?.id,
      returnUrl: `${window.location.origin}/my-wallet`,
      cancelUrl: `${window.location.origin}/my-wallet`,
      amount: Number(amount),
      description,
    });
    return response.qrCode;
  },

  getPaymentTransactionHistory: async (userId) => {
    try {
      const response = await axiosClient.get(`/payment-transaction/${userId}`)
      console.log(response);
      
      return response.response
    } catch (error) {
      console.error('Error fetching payment transaction histories:', error)
    }
  },

  checkPaymentStatus: async (paymentLinkId) => {
    const PAYOS_CLIENT_ID = import.meta.env.VITE_PAYOS_CLIENT_ID;
    const PAYOS_API_KEY = import.meta.env.VITE_PAYOS_CLIENT_API;
    const response = await axios.get(`https://api-merchant.payos.vn/v2/payment-requests/${paymentLinkId}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-client-id': PAYOS_CLIENT_ID,
        'x-api-key': PAYOS_API_KEY
      },
    });
    return response.data;
  }
}
export default PaymentService