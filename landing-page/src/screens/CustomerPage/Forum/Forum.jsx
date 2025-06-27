import React, { useEffect, useState, useCallback } from 'react';
import './style.css';
import FriendTag from './Friend';
import userService from '../../../services/user';
import FriendsList from './ListFriends';
import { ForumCreatePost } from './ForumCreatePost/ForumCreatePost';
import { PostDetailModal } from './PostDetailModal';
import PostList from './PostList';
import ForumService from '../../../services/forum';
import { PostModal } from './ForumCreatePost/PostModal';
import toast from 'react-hot-toast';
import { uploadImageToCloudinary } from '../../../services/cloudinary';
import { replace, useNavigate } from 'react-router-dom';
import ROUTES from '../../../utils/routes';

const Forum = () => {
    const [friends, setFriends] = useState([]);
    const [user, setUser] = useState();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPost, setSelectedPost] = useState(null);
    const [showPostDetail, setShowPostDetail] = useState(false);
    const [activeTab, setActiveTab] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [editingPost, setEditingPost] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editPostData, setEditPostData] = useState({ content: '', location: '', images: [] });
    const [isSubmittingEdit, setIsSubmittingEdit] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [members, setMembers] = useState([])
    // Thêm state cho tìm kiếm
    const [searchResults, setSearchResults] = useState({ posts: [], members: [] });
    const [isSearching, setIsSearching] = useState(false);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [shouldShowAllPosts, setShouldShowAllPosts] = useState(true);
    const navigate = useNavigate();

    const fetchCurrentUser = async() => {
        try {
            const result = await userService.getCurrentUser();
            if(result){
                setUser(result);
            }
        } catch (error) {
            console.error('Lỗi lấy thông tin người dùng:', error);
        }
    };
    const fetchMembers = async() => {
        try {
            const result = await userService.getAllMembers();
            if(result){
                setMembers(result)
            }
        }catch(error){
            console.error('Lỗi lấy danh sách người dùng', error);
        }
    }

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
        fetchMembers();
    }, []);

    useEffect(() => {
        if (user && user.id) {
            fetchListFriend(user.id);
            fetchPosts();
        }
    }, [user]);

    // Cleanup timeout khi component unmount
    useEffect(() => {
        return () => {
            if (searchTimeout) {
                clearTimeout(searchTimeout);
            }
        };
    }, [searchTimeout]);

    const handlePostCreated = (newPost) => {
        setPosts(prevPosts => [newPost, ...prevPosts]);
    };

    const handlePostClick = (post) => {
        setSelectedPost(post);
        setShowPostDetail(true);
        // Đóng modal tìm kiếm nếu đang mở
        if (showSearchResults) {
            closeSearchResults();
        }
    };

    const handlePostUpdated = () => {
        fetchPosts();
    };

    const handleClosePostDetail = () => {
        setShowPostDetail(false);
        setSelectedPost(null);
    };

    // Xử lý xóa bài đăng
    const handlePostDelete = async (post) => {
        setPostToDelete(post);
        setShowDeleteModal(true);
    };

    const confirmDeletePost = async () => {
        if (!postToDelete) return;
        
        try {
            await ForumService.deletePost(postToDelete.id);
            // Cập nhật danh sách bài đăng sau khi xóa
            setPosts(prevPosts => prevPosts.filter(p => p.id !== postToDelete.id));
            toast.success('Xóa bài đăng thành công!');
        } catch (error) {
            console.error('Lỗi xóa bài đăng:', error);
            toast.error('Có lỗi xảy ra khi xóa bài đăng!');
        } finally {
            setShowDeleteModal(false);
            setPostToDelete(null);
        }
    };

    // Xử lý sửa bài đăng (mở modal)
    const handlePostEdit = (post) => {
        setEditingPost(post);
        setEditPostData({
            content: post.content || '',
            location: post.location || '',
            images: post.images || [],
        });
        setShowEditModal(true);
    };

    // Lưu bài viết đã chỉnh sửa
    const handleSaveEditPost = async () => {
        if (!editingPost?.id) {
            toast.error('Không tìm thấy bài viết để cập nhật');
            return;
        }
        if (!editPostData.content.trim()) {
            toast.error('Vui lòng nhập nội dung bài viết');
            return;
        }
        setIsSubmittingEdit(true);
        try {
            // Xử lý upload ảnh mới nếu có
            const uploadedImageUrls = [];
            const existingImages = editPostData.images.filter(img => typeof img === 'string');
            const newImages = editPostData.images.filter(img => typeof img === 'object');
            for (const file of newImages) {
                const url = await uploadImageToCloudinary(file);
                uploadedImageUrls.push(url);
            }
            const allImages = [...existingImages, ...uploadedImageUrls];
            await ForumService.updatePost(editingPost.id, {
                content: editPostData.content,
                location: editPostData.location,
                images: allImages,
            });
            // Cập nhật UI ngay lập tức
            setPosts(prevPosts => prevPosts.map(post => post.id === editingPost.id ? { ...post, content: editPostData.content, location: editPostData.location, images: allImages } : post));
            setShowEditModal(false);
            setEditingPost(null);
            setEditPostData({ content: '', location: '', images: [] });
            toast.success('Cập nhật bài viết thành công');
        } catch (error) {
            console.log('Lỗi cập nhật bài viết:', error);
            toast.error('Cập nhật bài viết thất bại');
        } finally {
            setIsSubmittingEdit(false);
        }
    };

    // Lọc bài đăng của tôi
    const myPosts = user ? posts.filter(post => post.user.id === user.id) : [];

    // Hàm tìm kiếm bài đăng và người dùng
    const handleSearch = async (term) => {
        if (!term.trim()) {
            setShowSearchResults(false);
            setSearchResults({ posts: [], members: [] });
            setShouldShowAllPosts(true);
            return;
        }

        setIsSearching(true);
        setShowSearchResults(true);
        setShouldShowAllPosts(false); // Ẩn PostList khi có kết quả tìm kiếm

        try {
            // Tìm kiếm trong bài đăng hiện tại
            const filteredPosts = posts.filter(post =>
                post.content?.toLowerCase().includes(term.toLowerCase()) ||
                post.user?.userName?.toLowerCase().includes(term.toLowerCase()) ||
                post.location?.toLowerCase().includes(term.toLowerCase())
            );

            // Tìm kiếm trong danh sách thành viên (bao gồm cả bạn bè và không phải bạn bè)
            const filteredMembers = members.filter(member =>
                member.userName?.toLowerCase().includes(term.toLowerCase())
            );

            setSearchResults({
                posts: filteredPosts,
                members: filteredMembers
            });
        } catch (error) {
            console.error('Lỗi tìm kiếm:', error);
            toast.error('Có lỗi xảy ra khi tìm kiếm');
        } finally {
            setIsSearching(false);
        }
    };

    // Xử lý thay đổi search term với debounce
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        
        // Clear timeout cũ nếu có
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }
        
        // Ẩn kết quả tìm kiếm ngay lập tức khi user đang gõ
        if (showSearchResults) {
            setShowSearchResults(false);
        }
        
        if (value.trim()) {
            // Debounce search với 1000ms - chỉ tìm kiếm khi user ngừng gõ
            const timeout = setTimeout(() => {
                handleSearch(value);
            }, 1000);
            setSearchTimeout(timeout);
        } else {
            setShowSearchResults(false);
            setSearchResults({ posts: [], members: [] });
        }
    };

    // Xử lý submit search
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            handleSearch(searchTerm);
        }
    };

    // Đóng kết quả tìm kiếm
    const closeSearchResults = () => {
        setShowSearchResults(false);
        setSearchResults({ posts: [], members: [] });
        setSearchTerm(''); // Reset search term khi đóng
        setShouldShowAllPosts(true); // Hiển thị lại PostList
    };

    return (
        <>
            <div className="forum-banner">
                <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80" alt="Forum Banner" className="forum-banner-img" />
                <div className="forum-banner-overlay">
                    <h1 className="forum-banner-title">Diễn đàn Audivia</h1>
                    <p className="forum-banner-desc">Chia sẻ, kết nối và khám phá cùng cộng đồng đam mê du lịch!</p>
                    <div className="forum-banner-search">
                        <form onSubmit={handleSearchSubmit}>
                            <input
                                type="text"
                                placeholder="Tìm kiếm bài đăng, người dùng..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                            <button type="submit" className="forum-banner-search-icon">
                                <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path stroke="#2d8cff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m1.35-5.15a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="forum-content forum-content-new">
                {/* Hiển thị kết quả tìm kiếm */}
                {showSearchResults && (
                    <div className="search-results-overlay" onClick={closeSearchResults}>
                        <div className="search-results-container" onClick={(e) => e.stopPropagation()}>
                            <div className="search-results-header">
                                <h3>Kết quả tìm kiếm cho "{searchTerm}"</h3>
                                <button className="search-results-close" onClick={closeSearchResults}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                            </div>
                            
                            {isSearching ? (
                                <div className="search-loading">
                                    <p>Đang tìm kiếm...</p>
                                </div>
                            ) : (
                                <div className="search-results-content">
                                    {/* Kết quả thành viên */}
                                    {searchResults.members && searchResults.members.length > 0 && (
                                        <div className="search-section">
                                            <h4>Thành viên ({searchResults.members.length})</h4>
                                            <div className="search-users-list">
                                                {searchResults.members.map((member, index) => (
                                                    <div key={index} className="search-user-item" style={{cursor: 'pointer'}} onClick={() => {
                                                        closeSearchResults();
                                                        navigate(ROUTES.PROFILE.replace(':userId', member.id));
                                                    }}>
                                                        <FriendTag
                                                            avatarUrl={member.avatarUrl}
                                                            username={member.userName}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    
                                    {/* Kết quả bài đăng */}
                                    {searchResults.posts.length > 0 && (
                                        <div className="search-section">
                                            <h4>Bài đăng ({searchResults.posts.length})</h4>
                                            <div className="search-posts-list">
                                                {searchResults.posts.map((post) => (
                                                    <div key={post.id} className="search-post-item" onClick={() => handlePostClick(post)}>
                                                        <div className="search-post-content">
                                                            <div className="search-post-user">
                                                                <img src={post.user?.avatarUrl} alt={post.user?.userName} className="search-post-avatar" />
                                                                <span className="search-post-username">{post.user?.userName}</span>
                                                            </div>
                                                            <p className="search-post-text">{post.content?.substring(0, 100)}...</p>
                                                            {post.location && (
                                                                <span className="search-post-location">📍 {post.location}</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    
                                    {/* Không có kết quả */}
                                    {searchResults.posts.length === 0 && searchResults.members.length === 0 && (
                                        <div className="search-no-results">
                                            <p>Không tìm thấy kết quả nào cho "{searchTerm}"</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}

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
                    {shouldShowAllPosts && (
                        <div className="forum-post-list-wrapper">
                          {activeTab === 'all' ? (
                              <PostList 
                                  posts={posts}
                                  loading={loading}
                                  onPostClick={handlePostClick}
                                  searchTerm=""
                              />
                          ) : (
                              <PostList 
                                  posts={myPosts}
                                  loading={loading}
                                  onPostClick={handlePostClick}
                                  searchTerm=""
                                  user={user}
                                  onPostEdit={handlePostEdit}
                                  onPostDelete={handlePostDelete}
                                  showMenu={true}
                              />
                          )}
                        </div>
                    )}
                </div>
            </div>
            <PostDetailModal
                post={selectedPost}
                visible={showPostDetail}
                onClose={handleClosePostDetail}
                onPostUpdated={handlePostUpdated}
                members={members}
            />
            {/* Modal sửa bài viết */}
            {showEditModal && (
                <PostModal
                    visible={showEditModal}
                    onClose={() => {
                        setShowEditModal(false);
                        setEditingPost(null);
                        setEditPostData({ content: '', location: '', images: [] });
                    }}
                    onSave={handleSaveEditPost}
                    isSubmitting={isSubmittingEdit}
                    postData={editPostData}
                    setPostData={setEditPostData}
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
        </>
    );
};

export default Forum; 