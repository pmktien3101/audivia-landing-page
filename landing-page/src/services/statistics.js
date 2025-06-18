import axiosClient from '../utils/axiosClient';

const statisticsService = {
    revenueStat: async (startDate, endDate, groupBy, top) => {
        try {
            const params = new URLSearchParams();
            if (startDate) params.append('startDate', startDate);
            if (endDate) params.append('endDate', endDate);
            if (groupBy) params.append('groupBy', groupBy);
            if (top) params.append('top', top);
            const query = params.toString();
            const response = await axiosClient.get(`/statistics/revenue${query ? `?${query}` : ''}`);

            return response;
        } catch (error) {
            console.error("Error in revenueStat:", error);
            throw error;
        }
    },
    tourStat: async (groupBy, startDate, endDate) => {
        try {
            const params = new URLSearchParams();
            if (groupBy) params.append('groupBy', groupBy);
            if (startDate) params.append('startDate', startDate);
            if (endDate) params.append('endDate', endDate);
            const query = params.toString();
            const response = await axiosClient.get(`/statistics/tours${query ? `?${query}` : ''}`);

            return response;
        } catch (error) {
            console.error("Error in tourStat:", error);
            throw error;
        }
    },
    userStat: async (statType, startDate, endDate, groupBy) => {
        try {
            const params = new URLSearchParams();
            if (statType) params.append('statType', statType);
            if (startDate) params.append('startDate', startDate);
            if (endDate) params.append('endDate', endDate);
            if (groupBy) params.append('groupBy', groupBy);
            const query = params.toString();
            const response = await axiosClient.get(`/statistics/users${query ? `?${query}` : ''}`);

            return response;
        } catch (error) {
            console.error("Error in userStat:", error);
            throw error;
        }
    },
    postStat: async (startDate, endDate, groupBy) => {
        try {
            const params = new URLSearchParams();
            if (startDate) params.append('startDate', startDate);
            if (endDate) params.append('endDate', endDate);
            if (groupBy) params.append('groupBy', groupBy);
            const query = params.toString();
            const response = await axiosClient.get(`/statistics/posts${query ? `?${query}` : ''}`);

            return response;
        } catch (error) {
            console.error("Error in postStat:", error);
            throw error;
        }
    }
}

export default statisticsService;