import React, { useEffect, useState } from 'react';
import './style.css';
import { CreatePostHeader } from './CreatePostHeader';
import { CreatePostActions } from './CreatePostActions';
import { PostModal } from './PostModal';
import ForumService from '../../../../services/forum';
import userService from '../../../../services/user';
import toast from 'react-hot-toast';
import { uploadImageToCloudinary } from '../../../../services/cloudinary';

export const ForumCreatePost = ({ onPostCreated }) => {
  const [user, setUser] = useState(null);
  const [showPostModal, setShowPostModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [postData, setPostData] = useState({
    content: '',
    location: '',
    images: [],
  });

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

  const handleSavePost = async () => {
    if (!user?.id) {
      toast.error('Không tìm thấy thông tin người dùng');
      return;
    }

    if (!postData.content.trim()) {
      toast.error('Vui lòng nhập nội dung bài viết');
      return;
    }

    setIsSubmitting(true);
    try {


      const uploadedImageUrls = [];

      for (const file of postData.images) {
        const url = await uploadImageToCloudinary(file);
        uploadedImageUrls.push(url);
      }



      const response = await ForumService.createPost(
        uploadedImageUrls,
        postData.location,
        postData.content,
        user.id
      );

      if (response) {
        onPostCreated?.(response);
        setShowPostModal(false);
        setPostData({ content: '', location: '', images: [] });
        toast.success('Đăng bài thành công');
      }
    } catch (error) {
      console.log('Lỗi tạo bài viết:', error);
      toast.error('Đăng bài thất bại');
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
        postData={postData}
        setPostData={setPostData}
      />
    </div>
  );
};