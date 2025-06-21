import React, { useEffect, useState } from 'react';
import './style.css';
import ForumHeader from './ForumHeader';
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
            console.log(result);
            
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
        // Refresh posts when post is updated (like/unlike)
        fetchPosts();
    };

    const handleClosePostDetail = () => {
        setShowPostDetail(false);
        setSelectedPost(null);
    };

    return (
        <>
            <ForumHeader/>
            <div className="forum-content">
                <div className="forum-friends-list">
                    <h2 className="friends-list-title">Danh sách bạn bè</h2>
                    <div className="friends-list-container">
                        <FriendsList list={friends} />
                    </div>
                </div>
                <div className="forum-posts">
                    <ForumCreatePost onPostCreated={handlePostCreated} />
                     
                    
                    <PostList 
                        posts={posts}
                        loading={loading}
                        onPostClick={handlePostClick}
                    />
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