import React from 'react';
import Post from '../Post';
import './style.css';

const PostList = ({ posts, loading, onPostClick }) => {
  if (loading) {
    return (
      <div className="loading-posts">
        <p>Đang tải bài viết...</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="no-posts">
        <p>Chưa có bài viết nào. Hãy là người đầu tiên chia sẻ!</p>
      </div>
    );
  }

  return (
    <div className="post-list">
      {posts.map((post) => (
        <Post 
          key={post.id} 
          post={post} 
          onClick={onPostClick}
        />
      ))}
    </div>
  );
};

export default PostList; 