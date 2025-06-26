import React, { useEffect, useState } from 'react';
import CustomerSidebar from '../../../components/Sidebar/CustomerSidebar';
import FriendsList from '../Forum/ListFriends';
import PostList from '../Forum/PostList';
import userService from '../../../services/user';
import ForumService from '../../../services/forum';
import { ForumCreatePost } from '../Forum/ForumCreatePost/ForumCreatePost';
import { PostModal } from '../Forum/ForumCreatePost/PostModal';
import './style.css';
import { FiUsers, FiUser, FiMail, FiPhone, FiArrowDownLeft, FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../../utils/routes';

const MenuProfile = () => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');
  const [friends, setFriends] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [editPost, setEditPost] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const result = await userService.getCurrentUser();
        console.log('USERRR', result)
        if (result) {
          setUser(result);
          setUserProfile(result);
        }
      } catch (error) {
        // handle error
      }
    };
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) return;
      try {
        // Fetch friends and posts
        const [friendsData, postsData] = await Promise.all([
          userService.getUserFriends(user.id),
          ForumService.getPostByUserId(user.id)
        ]);
        setFriends(friendsData || []);
        setPosts(postsData || []);
      } catch (error) {
        // handle error
      } finally {
        setLoadingPosts(false);
      }
    };
    if (user && user.id) fetchData();
  }, [user]);

  const fetchPosts = async () => {
    if (!user?.id) return;
    setLoadingPosts(true);
    try {
      const postsData = await ForumService.getPostByUserId(user.id);
      setPosts(postsData || []);
    } catch (error) {
      // handle error
    } finally {
      setLoadingPosts(false);
    }
  };

  // Handler cho nút 3 chấm (edit/delete)
  const handleEditPost = (post) => {
    setEditPost(post);
    setShowEditModal(true);
  };

  const handleDeletePost = async (post) => {
    const confirmed = window.confirm('Bạn có chắc chắn muốn xoá bài viết này?');
    if (!confirmed) return;
    try {
      await ForumService.deletePost(post.id);
      await fetchPosts();
    } catch (error) {
      // handle error
    }
  };

  return (
    <div className="menu-profile-container">
      <div className="menu-profile-sidebar">
        <CustomerSidebar />
      </div>
      <div className="menu-profile-content">
       
        <div className="profile-header-bg">
        <button
          className="back-home-btn"
          onClick={() => navigate(ROUTES.HOME)}
        >
          <FiArrowLeft />
        </button>
          <div className="profile-avatar-wrapper">
            <img className="profile-avatar" src={userProfile?.avatarUrl || 'https://randomuser.me/api/portraits/men/32.jpg'} alt="avatar" />
          </div>
        </div>
        <div className="profile-info-box">
          <div className="profile-info-main">
            <h2 className="profile-name">{userProfile?.name || userProfile?.userName || 'Tina Pham'}</h2>
            <span className="profile-bio">{userProfile?.bio || 'Thích đi đây đi đó, trải nghiệm'}</span>
          </div>
          <div className="profile-stats">
            <div className="profile-stat"><span className="stat-number">{posts.length}</span><span className="stat-label">Bài đăng</span></div>
            <div className="profile-stat"><span className="stat-number">{userProfile?.followers || '3,586'}</span><span className="stat-label">Bạn bè</span></div>
            <div className="profile-stat"><span className="stat-number">{userProfile?.following || '2,659'}</span><span className="stat-label">Người đang theo dõi</span></div>
          </div>
        </div>
        <div className="profile-tabs">
          <button className={`tab${activeTab === 'profile' ? ' active' : ''}`} onClick={() => setActiveTab('profile')}>Trang cá nhân</button>
          <button className={`tab${activeTab === 'friends' ? ' active' : ''}`} onClick={() => setActiveTab('friends')}>Bạn bè</button>
        </div>
        {activeTab === 'profile' && (
          <div className="profile-post-box">
            <ForumCreatePost onPostCreated={newPost => setPosts(prev => [newPost, ...prev])} />
          </div>
        )}
        <div className="profile-main-content">
          {activeTab === 'profile' && (
            <>
              <div className="profile-intro">
                <h3>Giới Thiệu</h3>
                <ul className="profile-contact-list">
                <li><FiUser size={20} style={{marginRight: 6}}/> {userProfile?.fullName}</li>
                  <li><FiUsers size={20} style={{marginRight: 6}}/> {userProfile?.userName}</li>
                  <li><FiMail style={{marginRight: 6}}/> {userProfile?.email}</li>
                  <li><FiPhone style={{marginRight: 6}}/> {userProfile?.phone}</li>
                </ul>
              </div>
              <div className="profile-post-list" style={{flex: 2}}>
                <PostList 
                  posts={posts} 
                  loading={loadingPosts} 
                  onPostClick={() => {}} 
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
            onClose={() => setShowEditModal(false)}
            onSave={async (updatedData) => {
              try {
                await ForumService.updatePost(editPost.id, updatedData);
                setShowEditModal(false);
                await fetchPosts();
              } catch (error) {
                // handle error
              }
            }}
            initialData={editPost}
            isEdit={true}
          />
        )}
      </div>
    </div>
  );
};

export default MenuProfile;
