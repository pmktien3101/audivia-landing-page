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
  deleteTourSaved: async (savedTourId) => {
    try {
      const response = await axiosClient.delete(`/save-tours/${savedTourId}`);
      return response;
    } catch (error) {
      console.error('Error unsaving tour:', error);
      throw error;
    }
  },


  
  updateTourSaved: async (savedTourId, plannedTime) => {
    try {
      const response = await axiosClient.put(`/save-tours/${savedTourId}`, {
        plannedTime: plannedTime
      })
      return response
    } catch (error) {
      console.error('Error update planned time saved tour:', error);
      throw error;
    }
  }
};

export default saveTourService; 