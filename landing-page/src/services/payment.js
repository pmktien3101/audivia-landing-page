
import axiosClient from '../utils/axiosClient';
const PaymentService = {


createPaymentIntent: async (user, amount, description) => {
    const response = await axiosClient.post(`/payment/vietqr`, {
      userId: user?.id,
      returnUrl: `${window.location.origin}/my-wallet`,
      cancelUrl: `${window.location.origin}/my-wallet`,
      amount: Number(amount),
      description,
    });
    return response.qrCode.checkoutUrl;
  },
  
}
export default PaymentService