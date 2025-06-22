import React, { useEffect, useState } from 'react';
import './style.css';
import { CreatePostHeader } from './CreatePostHeader';
import { CreatePostActions } from './CreatePostActions';
import { PostModal } from './PostModal';
import ForumService from '../../../../services/forum';
import userService from '../../../../services/user';

export const ForumCreatePost = ({ onPostCreated }) => {
  const [user, setUser] = useState(null);
  const [showPostModal, setShowPostModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const DEFAULT_AVATAR = 'https://res.cloudinary.com/dgzn2ix8w/image/upload/v1745396073/Audivia/ddizjlgkux0eoifrsoco.avif';

  const fetchCurrentUser = async () => {
    try {
      const result = await userService.getCurrentUser();
      if (result) {
        setUser(result);
      }
    } catch (error) {
      console.error('Lỗi lấy thông tin người dùng:', error);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const handleSavePost = async (postData) => {
    if (!user?.id) {
      alert('Không tìm thấy thông tin người dùng');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await ForumService.createPost(
        postData.images,
        postData.location,
        postData.content,
        user.id
      );
      
      if (response) {
        onPostCreated?.(response);
        setShowPostModal(false);
        alert('Đăng bài thành công!');
      }
    } catch (error) {
      console.error('Lỗi tạo bài viết:', error);
      alert('Có lỗi xảy ra khi tạo bài viết');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-container">
      <div className="create-post-card">
        <CreatePostHeader 
          avatarUrl={user?.avatarUrl || DEFAULT_AVATAR} 
          onClick={() => setShowPostModal(true)} 
        />
        <CreatePostActions onClick={() => setShowPostModal(true)} />
      </div>

      <PostModal
        visible={showPostModal}
        onClose={() => setShowPostModal(false)}
        onSave={handleSavePost}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};