
import axiosClient from '../utils/axiosClient';

const ChatService = {
    createChatRoom: async (name, createdBy, type) => {
        try {
            const response = await axiosClient.post('/chat-rooms', {
                name: name,
                createdBy: createdBy,
                type: type,
                isActive: true
            });
            return response.response;
        } catch (error) {
            console.error('Lỗi tạo phòng chat', error);
            throw error;
        }
    },
    getChatRoomById: async (id)=> {
        try{
           const response = await axiosClient.get(`/chat-rooms/${id}`);   
           return response.response
        }
        catch(error){
            console.error("Không thể lấy thông tin chat room");
            
        }
    },
    
    createChatRoomMember: async (chatRoomId, userId, nickname, isHost) => {
        try {
            console.log(chatRoomId);
            console.log(userId);
            console.log(nickname);
            console.log(isHost);
            
            
            
            
            const response = await axiosClient.post('/chat-room-members', {
                chatRoomId: chatRoomId,
                userId: userId,
                nickname: nickname,
                isHost: isHost
            });     
            return response;
        } catch (error) {
            console.error('Lỗi thêm thành viên vào phòng chat', error);
            throw error;
        }
    },
    getPrivateRoom: async (user1Id, user2Id)=> {
        try {
            const response = await axiosClient.post(`/chat-room-members/private/${user1Id}/${user2Id}`);
            return response;
        } catch (error) {
            console.error('Lỗi lấy phòng chat riêng tư', error);
            throw error;
        }
    },

    getChatRoomsByUserId: async (userId) => {
        try {
            const response = await axiosClient.get(`/chat-rooms/user/${userId}`);
            return response;
        } catch (error) {
            console.error('Lỗi lấy danh sách phòng chat của người dùng', error);
            throw error;
        }
    }

    
    
}

export default ChatService