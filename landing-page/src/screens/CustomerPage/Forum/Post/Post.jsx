import React from 'react';
import './style.css';
import { FiHeart } from 'react-icons/fi';
import { HiHeart } from 'react-icons/hi2';
import { BiCommentMinus, BiLocationPlus } from 'react-icons/bi';

const Post = ({ post, onClick }) => {
  const handleClick = () => {
    onClick(post);
  };

  return (
    <div className="post-item" onClick={handleClick}>
      <div className="post-header">
        <img 
          src={post.user?.avatarUrl || 'https://res.cloudinary.com/dgzn2ix8w/image/upload/v1745396073/Audivia/ddizjlgkux0eoifrsoco.avif'} 
          alt="avatar" 
          className="post-avatar"
        />
        <div className="post-info">
          <h3>{post.user?.userName || 'Người dùng'}</h3>
          <span className="post-time">
            {post.time}
          </span>
        </div>
      </div>
      
      {post.location && (
        <div className="post-location">
          <BiLocationPlus color='red'/> {post.location}
        </div>
      )}
      
      <p className="post-content">{post.content}</p>
      
      {post.images && post.images.length > 0 && (
        <div className="post-images">
          {post.images.map((image, index) => (
            <img 
              key={index} 
              src={image} 
              alt={`Post image ${index + 1}`}
              className="post-image"
            />
          ))}
        </div>
      )}

      <div className="post-preview-actions">
        <span className="post-preview-likes">
          <HiHeart color='red'/> {post.likes || 0} lượt thích
        </span>
        <span className="post-preview-comments">
          <BiCommentMinus/> {post.comments || 0} bình luận
        </span>
      </div>
    </div>
  );
};

export default Post; 