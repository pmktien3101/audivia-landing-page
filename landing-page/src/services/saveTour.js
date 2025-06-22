import axiosClient from '../utils/axiosClient';

const saveTourService = {
  // Lấy danh sách tour đã lưu của user
  getSavedTours: async (userId) => {
    try {
        console.log('vap');
        
      const response = await axiosClient.get(`/save-tours/user/${userId}`);
      console.log(response);
      
      return response;
    } catch (error) {
      console.error('Error fetching saved tours:', error);
      throw error;
    }
  },

  // Lưu tour vào danh sách yêu thích
  saveTour: async (userId, tourId, plannedTime) => {
    try {
      const response = await axiosClient.post('/save-tours', {
        userId,
        tourId,
        plannedTime
      });
      return response;
    } catch (error) {
      console.error('Error saving tour:', error);
      throw error;
    }
  },

  // Bỏ lưu tour khỏi danh sách yêu thích
  deleteTourSaved: async (savedtourId) => {
    try {
      const response = await axiosClient.delete(`/save-tours/${savedtourId}`);
      return response;
    } catch (error) {
      console.error('Error unsaving tour:', error);
      throw error;
    }
  },


  
  toggleSaveTour: async (userId, tourId, isSaved) => {
    try {
      if (isSaved) {
        return await saveTourService.unsaveTour(userId, tourId);
      } else {
        return await saveTourService.saveTour(userId, tourId);
      }
    } catch (error) {
      console.error('Error toggling save tour:', error);
      throw error;
    }
  }
};

export default saveTourService; 