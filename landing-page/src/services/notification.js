import axiosClient from '../utils/axiosClient';



const NotificationService = {
    getNotificationsByUser: async (userId) => {
        try {
            const response = await axiosClient.get(`/notifications/user/${userId}`)
            console.log(response.response);
            
            return response.response
        } catch (error) {
            console.log(userId);
            
            console.log('Error at notification service: ', error)
            return []
        }
    },


    deleteNotification: async (notificationId) => {
        try {
            const response = await axiosClient.delete(`/notifications/${notificationId}`)
            return response.data
        } catch (error) {
            console.log('Error deleting notification: ', error)
            throw error
        }
    },


    updateStatusNotification: async (notificationId, userId, isRead) => {
        try {
            const response = await axiosClient.put(`/notifications/${notificationId}`, { userId,isRead })
            return response.data
        } catch (error) {
            console.log('Error updating notification status: ', error)
            throw error
        }
    },

    createNotification: async ({ userId, tourId, content, type, isRead }) => {
        try {
            const notification = { userId, tourId, content, type, isRead };
            const response = await axiosClient.post('/notifications', notification);
            return response.data.response;
        } catch (error) {
            console.log('Error creating notification: ', error);
            throw error;
        }
    }
}
export default NotificationService