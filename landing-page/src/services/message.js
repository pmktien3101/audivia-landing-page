import axiosClient from '../utils/axiosClient';

const MessageService = {
    getMessagesByChatRoom: async (chatRoomId) => {
        try {
            const response = await axiosClient.get(`/messages/chatroom/${chatRoomId}`);
            return response;
        } catch (error) {
            console.error('Lỗi lấy tin nhắn của phòng chat', error);
            throw error;
        }
    },

    
    createMessage: async (message) => {
        try {         
            const response = await axiosClient.post('/messages', message
            );
            return response.data;
        } catch (error) {
            console.error('Lỗi gửi tin nhắn', error);
            throw error;
        }
    },



}

export default MessageService