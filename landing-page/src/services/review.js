
import axiosClient from '../utils/axiosClient';

const ReviewService = {
  // Lấy danh sách tour đã lưu của user
  getReviewsByTourId: async (tourId) => {
    try {
        
      const response = await axiosClient.get(`tour-reviews/tour/${tourId}`);
      return response;
    } catch (error) {
      console.error('Error getReviewsByTourId:', error);
      throw error;
    }
  },
  getAllTourReviews: async () => {
    try{
      const response = await axiosClient.get('tour-reviews');
      console.log('REVIEW', response.response)
      return response.response;
    }catch(error){
      console.error('Error get review tours:', error);
      throw error;
    }
  }

}
export default ReviewService