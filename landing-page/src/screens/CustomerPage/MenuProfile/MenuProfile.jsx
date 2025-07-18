import React, { useEffect, useState } from 'react';
import CustomerSidebar from '../../../components/Sidebar/CustomerSidebar';
import FriendsList from '../Forum/ListFriends';
import PostList from '../Forum/PostList';
import userService from '../../../services/user';
import ForumService from '../../../services/forum';
import { ForumCreatePost } from '../Forum/ForumCreatePost/ForumCreatePost';
import { PostModal } from '../Forum/ForumCreatePost/PostModal';
import { PostDetailModal } from '../Forum/PostDetailModal';
import './style.css';
import { FiUsers, FiUser, FiMail, FiPhone, FiArrowDownLeft, FiArrowLeft } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import ROUTES from '../../../utils/routes';
import toast from 'react-hot-toast';
import { uploadImageToCloudinary } from '../../../services/cloudinary';
import useUser from '../../../hooks/useUser';
import FollowService from '../../../services/follow';
import ChatService from '../../../services/chat';

const MenuProfile = () => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');
  const [friends, setFriends] = useState([]);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showPostDetail, setShowPostDetail] = useState(false);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [editPost, setEditPost] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postData, setPostData] = useState({
    content: '',
    location: '',
    images: [],
  });
  const navigate = useNavigate();
  const currentUser = useUser();
  const { userId } = useParams();
  const [isFriend, setIsFriend] = useState(false);
  const [friendLoading, setFriendLoading] = useState(false);
  const [friendStatus, setFriendStatus] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        let result;
        if (userId) {
          result = await userService.getUserById(userId);
        } else if (currentUser && currentUser.userId) {
          result = await userService.getUserById(currentUser.userId);
        }
        if (result) {
          setUser(result.response);
          setUserProfile(result.response);
        }
      } catch (error) {}
    };
    if (userId || (currentUser && currentUser.userId)) {
      fetchUser();
    }
  }, [userId, currentUser]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) return;
      try {
        const [friendsData, postsData] = await Promise.all([
          userService.getUserFriends(user.id),
          ForumService.getPostByUserId(user.id)
        ]);
        setFriends(friendsData || []);
        setPosts(postsData || []);
      } catch (error) {
      } finally {
        setLoadingPosts(false);
      }
    };
    if (user && user.id) fetchData();
  }, [user]);

  const checkFriendStatus = async () => {
    if (!userId || !currentUser?.userId) return;
    setFriendLoading(true);
    try {
      const status = await FollowService.getFollower(currentUser.userId, userId);
      setFriendStatus(status?.followStatusString || '');
      console.log('STATUS', status.followStatusString)
    } catch (e) {
      setFriendStatus('');
    } finally {
      setFriendLoading(false);
    }
  };

  useEffect(() => {
    if (userId && currentUser?.userId) checkFriendStatus();
  }, [userId, currentUser]);

  const fetchPosts = async () => {
    if (!user?.id) return;
    setLoadingPosts(true);
    try {
      const postsData = await ForumService.getPostByUserId(user.id);
      setPosts(postsData || []);
    } catch (error) {
    } finally {
      setLoadingPosts(false);
    }
  };

  const handleEditPost = (post) => {
    setEditPost(post);
    // Chuyển đổi dữ liệu post sang format của postData
    setPostData({
      content: post.content || '',
      location: post.location || '',
      images: post.images || [],
    });
    setShowEditModal(true);
  };

  const handleDeletePost = async (post) => {
    setPostToDelete(post);
    setShowDeleteModal(true);
  };

  const confirmDeletePost = async () => {
    if (!postToDelete) return;
    
    try {
      await ForumService.deletePost(postToDelete.id);
      await fetchPosts();
      toast.success('Xóa bài viết thành công');
    } catch (error) {
      toast.error('Xóa bài viết thất bại');
    } finally {
      setShowDeleteModal(false);
      setPostToDelete(null);
    }
  };

  const handleSaveEditPost = async () => {
    if (!editPost?.id) {
      toast.error('Không tìm thấy bài viết để cập nhật');
      return;
    }

    if (!postData.content.trim()) {
      toast.error('Vui lòng nhập nội dung bài viết');
      return;
    }

    setIsSubmitting(true);
    try {
      // Xử lý upload ảnh mới nếu có
      const uploadedImageUrls = [];
      const existingImages = postData.images.filter(img => typeof img === 'string');
      const newImages = postData.images.filter(img => typeof img === 'object');

      // Upload ảnh mới
      for (const file of newImages) {
        const url = await uploadImageToCloudinary(file);
        uploadedImageUrls.push(url);
      }

      // Kết hợp ảnh cũ và ảnh mới
      const allImages = [...existingImages, ...uploadedImageUrls];

    
      await ForumService.updatePost(editPost.id, {
        content: postData.content,
        location: postData.location,
        images: allImages,
      });

      // Cập nhật UI ngay lập tức
      setPosts(prevPosts => {
        const updatedPosts = prevPosts.map(post => {
          return post.id === editPost.id 
            ? { 
                ...post, 
                content: postData.content,
                location: postData.location,
                images: allImages
              }
            : post;
        });
        return updatedPosts;
      });

      // Đóng modal và reset state
      setShowEditModal(false);
      setEditPost(null);
      setPostData({ content: '', location: '', images: [] });
      
      // Hiển thị toast thành công
      toast.success('Cập nhật bài viết thành công');
      
    } catch (error) {
      console.log('Lỗi cập nhật bài viết:', error);
      toast.error('Cập nhật bài viết thất bại');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePostCreated = (newPost) => {
    setPosts(prev => [newPost, ...prev]);
  };
  const handlePostClick = (post) => {
    setSelectedPost(post);
    setShowPostDetail(true);
  };
  const handleClosePostDetail = () => {
  setShowPostDetail(false);
  setSelectedPost(null);
};

  const handleFriendClick = async () => {
    if (!currentUser?.userId || !userId) return;
    setFriendLoading(true);
    try {
      if (friendStatus === 'Friends') {
        await FollowService.unfollowUser(currentUser.userId, userId);
        toast.success('Đã huỷ theo dõi');
        await checkFriendStatus();
      } else if (friendStatus === 'Following') {
        await FollowService.unfollowUser(currentUser.userId, userId);
        toast.success('Đã huỷ theo dõi');
        await checkFriendStatus();
      } else if (friendStatus === 'NotFollowing') {
        await FollowService.followUser(currentUser.userId, userId);
        toast.success('Đã bấm theo dõi');
        await checkFriendStatus();
      } else if (friendStatus === 'NotFollowedBack') {
        await FollowService.followUser(currentUser.userId, userId);
        toast.success('Đã bấm theo dõi');
        await checkFriendStatus();
      }
    } catch (e) {
      toast.error('Có lỗi xảy ra');
    } finally {
      setFriendLoading(false);
    }
  };




  const handleMessageClick = async () => {
    try { 
      console.log(currentUser.userId);
      console.log(userProfile.id);
      
      const response = await ChatService.getPrivateRoom(currentUser.userId, userProfile.id)
      console.log(response);
      
      if (response)
      {
        navigate(`/message/t/${response.id}`);
      }
      else{
        try {

          const chatRoom = await ChatService.createChatRoom("Private chat", currentUser.userId, 'private');

          if (chatRoom){
            // Thêm current user vào room
            await ChatService.createChatRoomMember(chatRoom.id, currentUser.userId, currentUser.name, true);
            // thêm bạn
            await ChatService.createChatRoomMember(chatRoom.id, userProfile.id, userProfile.userName, false);
            navigate(`/message/t/${chatRoom.id}`);
          }

        } catch (error) {
          
        }


      }
        
    } catch (error) {
      console.log(error);
      
    }
    
  }





  return (
      <div className="menu-profile-content">
       
        <div className="profile-header-bg">
          <div className="profile-avatar-wrapper">
            <img className="profile-avatar" src={userProfile?.avatarUrl} alt="avatar" />
          </div>
        </div>
        <div className="profile-info-box">
          <div className="profile-info-main">
            <h2 className="profile-name">{userProfile?.name || userProfile?.userName}</h2>
            <span className="profile-bio">{userProfile?.bio}</span>
          </div>
          <div className="profile-stats">
            {!userId ? (
              <>
                <div className="profile-stat">
                  <span className="stat-number">{posts.length}</span>
                  <span className="stat-label">Bài đăng</span>
                </div>
                <div className="profile-stat">
                  <span className="stat-number">{userProfile?.following}</span>
                  <span className="stat-label">Bạn bè</span>
                </div>
                <div className="profile-stat">
                  <span className="stat-number">{userProfile?.followers}</span>
                  <span className="stat-label">Người đang theo dõi</span>
                </div>
              </>
            ) : (
              <div style={{ display: 'flex', gap: 12 }}>
                <button
                  className="profile-action-btn"
                  onClick={handleFriendClick}
                  disabled={friendLoading}
                >
                  {friendLoading
                    ? 'Đang xử lý...'
                    : friendStatus === 'Friends'
                      ? 'Bạn bè (Huỷ)'
                      : friendStatus === 'NotFollowedBack'
                        ? 'Kết Bạn'
                        : friendStatus === 'NotFollowing'
                        ? 'Kết bạn'
                        : friendStatus === 'Following'
                          ? 'Huỷ theo dõi'
                          : 'Kết bạn'
                  }
                </button>
                <button className="profile-action-btn" onClick={handleMessageClick}>Nhắn tin</button>
              </div>
            )}
          </div>
        </div>
       {!userId && (
        <div className="profile-tabs">
          <button className={`tab${activeTab === 'profile' ? ' active' : ''}`} onClick={() => setActiveTab('profile')}>Trang cá nhân</button>
          <button className={`tab${activeTab === 'friends' ? ' active' : ''}`} onClick={() => setActiveTab('friends')}>Bạn bè</button>
        </div>
       )}
        {activeTab === 'profile' && !userId && (
          <div className="profile-post-box">
            <ForumCreatePost onPostCreated={handlePostCreated} />
          </div>
        )}
        <div className="profile-main-content">
          {activeTab === 'profile' && (
            <>
              <div className="profile-intro">
                <h3>Giới Thiệu</h3>
                <ul className="profile-contact-list">
                <li><FiUser size={20} style={{marginRight: 6}}/> {userProfile?.fullName}</li>
                  <li><FiMail style={{marginRight: 6}}/> {userProfile?.email}</li>
                  <li><FiPhone style={{marginRight: 6}}/> {userProfile?.phone}</li>
                </ul>
              </div>
              <div className="profile-post-list" style={{flex: 2}}>
                <PostList 
                  posts={posts} 
                  loading={loadingPosts} 
                  onPostClick={handlePostClick} 
                  user={user} 
                  onPostEdit={handleEditPost}
                  onPostDelete={handleDeletePost}
                  showMenu={true}
                />
              </div>
            </>
          )}
          {activeTab === 'friends' && (
            <div style={{width: '100%'}}>
              <FriendsList list={friends} />
            </div>
          )}
        </div>
        {showEditModal && (
          <PostModal
            visible={showEditModal}
            onClose={() => {
              setShowEditModal(false);
              setEditPost(null);
              setPostData({ content: '', location: '', images: [] });
            }}
            onSave={handleSaveEditPost}
            isSubmitting={isSubmitting}
            postData={postData}
            setPostData={setPostData}
            isEdit={true}
          />
        )}
        
        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="delete-modal-overlay" onClick={() => setShowDeleteModal(false)}>
            <div className="delete-modal" onClick={(e) => e.stopPropagation()}>
              <div className="delete-modal-header">
                <div className="delete-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="#EF4444"/>
                  </svg>
                </div>
                <h3>Xóa bài viết</h3>
                <p>Bạn có chắc chắn muốn xóa bài viết này không? Hành động này không thể hoàn tác.</p>
              </div>
              <div className="delete-modal-actions">
                <button 
                  className="delete-cancel-btn" 
                  onClick={() => setShowDeleteModal(false)}
                >
                  Hủy
                </button>
                <button 
                  className="delete-confirm-btn" 
                  onClick={confirmDeletePost}
                >
                  Xóa bài viết
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Post Detail Modal */}
        <PostDetailModal
          post={selectedPost}
          visible={showPostDetail}
          onClose={handleClosePostDetail}
          onPostUpdated={fetchPosts}
        />
      </div>
  );
};

export default MenuProfile;
