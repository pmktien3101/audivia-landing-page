import React, { useState } from 'react';
import Post from '../Post';
import './style.css';

const POSTS_PER_PAGE = 6;

const PostList = ({ posts, loading, onPostClick, searchTerm, user, onPostEdit, onPostDelete, showMenu }) => {
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);

  // Lọc theo searchTerm nếu có
  const filteredPosts = searchTerm
    ? posts.filter(post =>
        post.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.user?.userName?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : posts;

  if (loading) {
    return (
      <div className="loading-posts">
        <p>Đang tải bài viết...</p>
      </div>
    );
  }

  if (filteredPosts.length === 0) {
    return (
      <div className="no-posts">
        <p>Không tìm thấy bài viết nào.</p>
      </div>
    );
  }

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const canLoadMore = visibleCount < filteredPosts.length;

  return (
    <>
      <div className="post-list">
        {visiblePosts.map((post) => (
          <Post 
            key={post.id} 
            post={post} 
            onClick={onPostClick}
            {...(showMenu ? { user, onPostEdit, onPostDelete, showMenu: true } : {})}
          />
        ))}
      </div>
      {canLoadMore && (
        <div className="post-list-more">
          <button className="post-list-more-btn" onClick={() => setVisibleCount(visibleCount + POSTS_PER_PAGE)}>
            Xem thêm
          </button>
        </div>
      )}
    </>
  );
};

export default PostList; 