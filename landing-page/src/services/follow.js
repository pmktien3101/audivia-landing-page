
import axiosClient from '../utils/axiosClient';

const FollowService = {
    getFollower: async (currentUserId, targetUserId) => {
        try {
            const response = await axiosClient.get(`/user-follows/status?CurrentUserId=${currentUserId}&TargetUserId=${targetUserId}`)
            return response
        } catch (error) {
            console.log("Error getFollower", error);
            
        }
    },
    followUser: async (followerId, followingId) => {
        try {
            const response = await axiosClient.post(`/user-follows`, { followerId, followingId })
            return response
        } catch (error) {
            console.log("Error followUser", error);
            
        }
    },
    unfollowUser: async (followerId, followingId) => {
        try {
            await axiosClient.delete(`/user-follows?FollowerId=${followerId}&FollowingId=${followingId}`)
        } catch (error) {
            console.error('Lỗi xóa thêm bạn:', error.response?.data || error.message)
        throw error
        }
    }

}

export default FollowService