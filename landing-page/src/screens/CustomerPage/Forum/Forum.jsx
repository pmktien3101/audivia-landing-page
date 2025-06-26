import React, { useEffect, useState } from 'react';
import './style.css';
import FriendTag from './Friend';
import userService from '../../../services/user';
import FriendsList from './ListFriends';
import { ForumCreatePost } from './ForumCreatePost/ForumCreatePost';
import { PostDetailModal } from './PostDetailModal';
import PostList from './PostList';
import ForumService from '../../../services/forum';

const Forum = () => {
    const [friends, setFriends] = useState([]);
    const [user, setUser] = useState();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPost, setSelectedPost] = useState(null);
    const [showPostDetail, setShowPostDetail] = useState(false);
    const [activeTab, setActiveTab] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const fetchCurrentUser = async() => {
        try {
            const result = await userService.getCurrentUser();
            console.log('USERr', result)
            if(result){
                setUser(result);
            }
        } catch (error) {
            console.error('Lỗi lấy thông tin người dùng:', error);
        }
    };

    const fetchListFriend = async () => {
        try {
            const result = await userService.getUserFriends(user.id);
            if (result) {
                setFriends(result);
            }
        } catch (error) {
            console.error('Lỗi lấy danh sách bạn bè:', error);
        }
    };

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const result = await ForumService.getAllPosts();
            console.log('POST', result)
            if (result) {
                setPosts(result);
            }
        } catch (error) {
            console.error('Lỗi lấy danh sách bài viết:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    useEffect(() => {
        if (user && user.id) {
            fetchListFriend(user.id);
            fetchPosts();
        }
    }, [user]);

    const handlePostCreated = (newPost) => {
        setPosts(prevPosts => [newPost, ...prevPosts]);
    };

    const handlePostClick = (post) => {
        setSelectedPost(post);
        setShowPostDetail(true);
    };

    const handlePostUpdated = () => {
        fetchPosts();
    };

    const handleClosePostDetail = () => {
        setShowPostDetail(false);
        setSelectedPost(null);
    };

    // Lọc bài đăng của tôi
    const myPosts = user ? posts.filter(post => post.user.id === user.id) : [];

    return (
        <>
            <div className="forum-banner">
                <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80" alt="Forum Banner" className="forum-banner-img" />
                <div className="forum-banner-overlay">
                    <h1 className="forum-banner-title">Diễn đàn Audivia</h1>
                    <p className="forum-banner-desc">Chia sẻ, kết nối và khám phá cùng cộng đồng đam mê du lịch!</p>
                    <div className="forum-banner-search">
                        <input
                            type="text"
                            placeholder="Tìm kiếm bài đăng, người dùng..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                        <span className="forum-banner-search-icon">
                            <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path stroke="#2d8cff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m1.35-5.15a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                        </span>
                    </div>
                </div>
            </div>
            <div className="forum-content forum-content-new">
                <div className="forum-friends-list forum-friends-list-new">
                    <h2 className="friends-list-title">Danh sách bạn bè</h2>
                    <div className="friends-list-container">
                        <FriendsList list={friends} />
                    </div>
                </div>
                <div className="forum-posts forum-posts-new">
                    <ForumCreatePost onPostCreated={handlePostCreated} />
                    {/* Tabs */}
                    <div className="forum-tabs-wrapper">
                      <div className="forum-tabs">
                        <button className={activeTab === 'all' ? 'active' : ''} onClick={() => setActiveTab('all')}>
                          Tất cả bài đăng
                        </button>
                        <button className={activeTab === 'mine' ? 'active' : ''} onClick={() => setActiveTab('mine')}>
                          Bài đăng của tôi
                        </button>
                      </div>
                    </div>
                    {/* Danh sách bài đăng */}
                    <div className="forum-post-list-wrapper">
                      {activeTab === 'all' ? (
                          <PostList 
                              posts={posts}
                              loading={loading}
                              onPostClick={handlePostClick}
                              searchTerm={searchTerm}
                          />
                      ) : (
                          <PostList 
                              posts={myPosts}
                              loading={loading}
                              onPostClick={handlePostClick}
                              searchTerm={searchTerm}
                          />
                      )}
                    </div>
                </div>
            </div>
            <PostDetailModal
                post={selectedPost}
                visible={showPostDetail}
                onClose={handleClosePostDetail}
                onPostUpdated={handlePostUpdated}
            />
        </>
    );
};

export default Forum; 