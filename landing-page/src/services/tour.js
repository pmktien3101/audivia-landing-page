import axiosClient from '../utils/axiosClient';

const tourService = {
  getAllToursPaginated: async (params = {}) => {
    try {
      // Default params
      const defaultParams = {
        pageIndex: 1,
        ...params
      };

      const response = await axiosClient.get('/tours', { params: defaultParams });
      console.log(response);

      return {
        success: response.response.success,
        data: response.response.data,
        pagination: {
          pageIndex: response.response.pageIndex,
          pageSize: response.response.pageSize,
          totalPages: response.response.totalPages,
          count: response.response.count
        }
      };
    } catch (error) {
      console.error('Error fetching tours:', error);
      throw error;
    }
  },

  getToursByCategory: async (categoryId, params = {}) => {
    try {
      const response = await axiosClient.get('/tours', {
        params: {
          ...params,
          TourTypeId: categoryId !== 'all' ? categoryId : undefined,
          PageIndex: params.PageIndex || 1,
          PageSize: params.PageSize || 3
        }
      });
      return {
        success: response.response.success,
        data: response.response.data,
        pagination: {
          pageIndex: response.response.pageIndex,
          pageSize: response.response.pageSize,
          totalPages: response.response.totalPages,
          count: response.response.count
        }
      };
    } catch (error) {
      console.error('Error fetching tours by category:', error);
      throw error;
    }
  },


  getAllTours: async (pageIndex = 1, pageSize = 5) => {
    try {
      const response = await axiosClient.get('/tours', {
        params: { pageIndex, pageSize }
      });
      console.log('TOUR', response)
      return response.response.data
    } catch (error) {
      throw error;
    }
  },
  createTour: async (tourData) => {
    try {
      const response = await axiosClient.post('/tours', tourData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  updateTour: async (id, tourData) => {
    try {
      await axiosClient.put(`/tours/${id}`, tourData);
    } catch (error) {
      throw error;
    }
  },
  deleteTour: async (id) => {
    try {
      await axiosClient.delete(`/tours/${id}`);
    } catch (error) {
      throw error;
    }
  },
  getTourTypes: async () => {
    try {
      const response = await axiosClient.get('/tour-types');
      console.log('TYPE', response)
      return response.response;
    } catch (error) {
      throw error;
    }
  },


  getTourById: async (id) => {
    try {
      const response = await axiosClient.get(`/tours/${id}`)
      return response.response
    } catch (error) {
      console.log('Error at getTourById', error);

    }
  },


  getSuggestedTours: async (userId, long, lat, radius) => {
    try {
      const response = await axiosClient.get(`/tours/suggested?UserId=${userId}&Longitude=${long}&Latitude=${lat}&Radius=${radius}`)
      return response.response.data
    } catch (error) {
      throw error
    }
  },

  getTourAudioByCheckpointId: async (checkpointId, characterId) => {
    try {
      const response = await axiosClient.get(`/checkpoint-audios/checkpoint/${checkpointId}/character/${characterId}`)
      return response.data
    } catch (error) {
      console.error('Lỗi lấy tour audio:', error)
      throw error
    }
  },
  hasAudioForTour: async(tourId) => {
    try {
      const response = await axiosClient.get(`/checkpoint-audios/tour?tour=${tourId}`)
      return response
    } catch (error) {
      console.error('Lỗi lấy tour audio:', error)
      throw error
    }
  }

};

export default tourService;
