import axiosClient from '../utils/axiosClient';

const tourService = {
    getAllToursPaginated: async (params = {}) => {
        try {
          // Default params
          const defaultParams = {
            pageIndex: 1,
            pageSize: 3,
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
      }
    
  };


export default tourService