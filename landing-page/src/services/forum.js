import axiosClient from '../utils/axiosClient';

const ForumService = {
    getPostByUserId: async (userId) => {
        try {
            const response = await axiosClient.get(`/posts/users/${userId}`);
            return response.response;
        } catch (error) {
            console.error('Lỗi lấy danh sách bài đăng của người dùng', error);
            throw error;
        }
    },

    getAllPosts: async () => {
        
        try {
            const response = await axiosClient.get('/posts');
            return response.response;
        } catch (error) {
            console.error('Lỗi lấy hết danh sách bài đăng');
            throw error;
        }
    },

    createPost: async (images, location, content, createdBy) => {
        console.log(images);
        console.log(content);
        console.log(createdBy);
        
        
        
        try {
            const postData = {
                title: "string",
                images: images,
                location: location || '',
                content: content.trim(),
                createdBy: createdBy
            };

            console.log('Sending post data:', postData);

            const response = await axiosClient.post('/posts', postData);
            return response.response;
        } catch (error) {
            console.error('Lỗi tạo bài đăng:', error.response?.data || error.message);
            throw error;
        }
    },

    updatePost: async (id, data) => {
        try {
            const response = await axiosClient.put(`/posts/${id}`, data);
            return response.response;
        } catch (error) {
            console.error('Lỗi cập nhật thông tin bài đăng:', error.response?.data || error.message);
            throw error;
        }
    },

    deletePost: async (id) => {
        try {
            const response = await axiosClient.delete(`/posts/${id}`);
            return response.response;
        } catch (error) {
            console.error('Lỗi xóa bài đăng:', error.response?.data || error.message);
            throw error;
        }
    },

    reactPost: async (type, postId, createdBy) => {
        try {
            const response = await axiosClient.post(`/reactions`, { type, postId, createdBy });
            return response.response;
        } catch (error) {
            console.error('Lỗi react bài đăng:', error.response?.data || error.message);
            throw error;
        }
    },

    getUserReactions: async (userId) => {
        try {
            const response = await axiosClient.get(`/reactions/users/${userId}`);
            return response.response;
        } catch (error) {
            console.error('Lỗi lấy danh sách reactions của user:', error.response?.data || error.message);
            throw error;
        }
    },

    getReactionByUserAndPost: async (userId, postId) => {
        const response = await axiosClient.get(`/reactions/posts/${postId}/users/${userId}`);
        return response.response;
    },

    getPostReactions: async (postId) => {
        try {
            const response = await axiosClient.get(`/reactions/posts/${postId}`);
            return response.response;
        } catch (error) {
            console.error('Lỗi lấy danh sách reactions của bài đăng:', error.response?.data || error.message);
            throw error;
        }
    },

    commentPost: async (content, postId, createdBy) => {
        try {
            const response = await axiosClient.post(`/comments`, { content, postId, createdBy });
            return response.response;
        } catch (error) {
            console.error('Lỗi comment bài đăng:', error.response?.data || error.message);
            throw error;
        }
    },

    getPostComments: async (postId) => {
        try {
            const response = await axiosClient.get(`/comments/posts/${postId}`);
            return response.response;
        } catch (error) {
            console.error('Lỗi lấy danh sách comment của bài đăng:', error.response?.data || error.message);
            throw error;
        }
    },

    deleteComment: async (id, userId) => {
        try {
            const response = await axiosClient.delete(`/comments/${id}?userId=${userId}`);
            return response.response;
        } catch (error) {
            console.error('Lỗi xóa comment:', error.response?.data || error.message);
            throw error;
        }
    },

    updateComment: async (commentId, content, updatedBy) => {
        try {
            const response = await axiosClient.put(`/comments/${commentId}`, { content, updatedBy });
            return response.response;
        } catch (error) {
            console.error('Lỗi cập nhật bình luận:', error.response?.data || error.message);
            throw error;
        }
    }
};

export default ForumService;