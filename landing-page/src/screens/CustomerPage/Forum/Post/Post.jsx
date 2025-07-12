import React, { useState, useRef } from 'react';
import './style.css';
import { FiHeart, FiMoreHorizontal, FiEdit3, FiTrash2 } from 'react-icons/fi';
import { HiHeart } from 'react-icons/hi2';
import { BiCommentMinus, BiLocationPlus } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../../../utils/routes';

const Post = ({ post, onClick, user, showMenu, onPostEdit, onPostDelete }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate()
  const handleClick = () => {
    onClick(post);
  };

  // Đóng menu khi click ra   ngoài
  React.useEffect(() => {
    if (!menuOpen) return;
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  const isOwner = showMenu && user && post.user && (user.id === post.user.id);
  
  const handleNavigateProfile = (user) => {
    navigate(ROUTES.PROFILE.replace(':userId', user.id));
  }
  return (
    <div className="post-item" onClick={handleClick}>
      <div className="post-header">
        <img 
          src={post.user?.avatarUrl || 'https://res.cloudinary.com/dgzn2ix8w/image/upload/v1745396073/Audivia/ddizjlgkux0eoifrsoco.avif'} 
          alt="avatar" 
          className="post-avatar"
          onClick={() => handleNavigateProfile(post.user)}
        />
        <div className="post-info">
          <h3 className='post-username' onClick={() => handleNavigateProfile(post.user)}>{post.user?.userName || 'Người dùng'}</h3>
          <span className="post-time">
            {post.time}
          </span>
        </div>
        <div>

        </div>
        {isOwner && (
          <div className="post-menu-wrapper" ref={menuRef} onClick={e => e.stopPropagation()}>
            <button className="post-menu-btn" onClick={() => setMenuOpen(v => !v)}>
              <FiMoreHorizontal size={20} />
            </button>
            {menuOpen && (
              <div className="post-menu-dropdown">
                <button className="post-menu-item" onClick={() => { 
                  setMenuOpen(false); 
                  onPostEdit?.(post); 
                }}>
                  <FiEdit3 size={16} /> Sửa
                </button>
                <button className="post-menu-item delete" onClick={() => { setMenuOpen(false); onPostDelete?.(post); }}>
                  <FiTrash2 size={16} /> Xoá
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      
      {post.location && (
        <div className="post-location">
          <BiLocationPlus color='red'/> {post.location}
        </div>
      )}
      
      <p className="post-content">{post.content}</p>
      
      {post.images && post.images.length > 0 && (
        <div className="post-images">
          {post.images.slice(0, 3).map((image, index) => {
            if (index === 2 && post.images.length > 3) {
              return (
                <div key={index} className="post-image-more-wrapper" onClick={handleClick} style={{ position: 'relative', cursor: 'pointer' }}>
                  <img 
                    src={image} 
                    alt={`Post image ${index + 1}`}
                    className="post-image"
                  />
                  <div className="post-image-more-overlay">
                    +{post.images.length - 3} ảnh
                  </div>
                </div>
              );
            }
            return (
              <img 
                key={index} 
                src={image} 
                alt={`Post image ${index + 1}`}
                className="post-image"
                onClick={handleClick}
              />
            );
          })}
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