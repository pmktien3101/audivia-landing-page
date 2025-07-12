import React, { useState, useEffect, useCallback } from 'react';
import { FiX, FiHeart, FiMessageCircle, FiSend, FiEdit3, FiTrash2 } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import './style.css';
import ForumService from '../../../../services/forum';
import userService from '../../../../services/user';
import { CiLocationOn } from 'react-icons/ci';
import { BiLocationPlus } from 'react-icons/bi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../../../utils/routes';

export const PostDetailModal = ({ post, visible, onClose, onPostUpdated, members = [] }) => {
  const [user, setUser] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post?.reactions?.length || 0);
  const [commentText, setCommentText] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [comments, setComments] = useState([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [editingComment, setEditingComment] = useState(null);
  const [editedContent, setEditedContent] = useState('');
  const [showDeleteCommentModal, setShowDeleteCommentModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const navigate = useNavigate()
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

  const fetchComments = async () => {
    if (!post?.id) return;
    setIsLoadingComments(true);
    try {
      const result = await ForumService.getPostComments(post.id);
      if (result) {
        setComments(result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      }
    } catch (error) {
      console.error('Lỗi lấy bình luận:', error);
    } finally {
      setIsLoadingComments(false);
    }
  };

  const checkUserReaction = async () => {
    if (!user?.id || !post?.id) return;
    try {
      const result = await ForumService.getReactionByUserAndPost(user.id, post.id);
      setIsLiked(!!result);
    } catch (error) {
      console.error('Lỗi kiểm tra reaction:', error);
    }
  };

  useEffect(() => {
    if (visible && post) {
      fetchCurrentUser();
      fetchComments();
      setLikesCount(post.likes || 0);
    }
  }, [visible, post]);

  useEffect(() => {
    if (user && post) {
      checkUserReaction();
    }
  }, [user, post]);

  const handleLike = async () => {
    if (!user?.id || !post?.id) return;
    
    const originallyLiked = isLiked;
    setIsLiked(!originallyLiked);
    setLikesCount(prev => Math.max(0, originallyLiked ? prev - 1 : prev + 1));
    
    try {
      await ForumService.reactPost(0, post.id, user.id);
      if (onPostUpdated) {
        onPostUpdated();
      }
    } catch (error) {
      console.error('Lỗi like bài viết:', error);
      setIsLiked(originallyLiked);
      setLikesCount(prev => Math.max(0, originallyLiked ? prev + 1 : prev - 1));
    }
  };

  const handleComment = async () => {
    if (!user?.id || !post?.id || !commentText.trim() || isSubmittingComment) return;
    
    setIsSubmittingComment(true);
    try {
      const newComment = await ForumService.commentPost(commentText.trim(), post.id, user.id);
      if (newComment) {
        setComments(prev => [newComment, ...prev]);
        setCommentText('');
        if (onPostUpdated) onPostUpdated();
      }
    } catch (error) {
      console.error('Lỗi đăng bình luận:', error);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleUpdateComment = async () => {
    if (!editingComment || !editedContent.trim() || !user?.id) return;
    
    try {
      await ForumService.updateComment(editingComment.id, editedContent.trim(), user.id);
      setComments(prev => prev.map(c => 
        c.id === editingComment.id 
          ? { ...c, content: editedContent.trim() }
          : c
      ));
      setEditingComment(null);
      setEditedContent('');
      toast.success('Sửa bình luận thành công')
    } catch (error) {
      console.error('Lỗi cập nhật bình luận:', error);
      alert('Đã xảy ra lỗi khi cập nhật bình luận.');
    }
  };

  const handleDeleteComment = (commentId) => {
    setCommentToDelete(commentId);
    setShowDeleteCommentModal(true);
  };

  const confirmDeleteComment = async () => {
    if (!user?.id || !commentToDelete) return;
    const originalComments = [...comments];
    setComments(prev => prev.filter(c => c.id !== commentToDelete));
    setShowDeleteCommentModal(false);
    try {
      await ForumService.deleteComment(commentToDelete, user.id);
      toast.success('Xoá bình luận thành công')
      if (onPostUpdated) onPostUpdated();
    } catch (error) {
      console.error('Lỗi xóa bình luận:', error);
      setComments(originalComments);
      alert('Xóa bình luận thất bại.');
    } finally {
      setCommentToDelete(null);
    }
  };

  const startEditComment = (comment) => {
    setEditingComment(comment);
    setEditedContent(comment.content);
  };

  const cancelEditComment = () => {
    setEditingComment(null);
    setEditedContent('');
  };

  if (!visible || !post) return null;

  const handleNavigateProfile = (user) => {
    navigate(ROUTES.PROFILE.replace(':userId', user.id));
  }

  return (
    <div className="post-detail-modal-overlay" onClick={onClose}>
      <div className="post-detail-modal" onClick={(e) => e.stopPropagation()}>
        <div className="post-detail-header">
          <h3>Chi tiết bài viết</h3>
          <button className="close-btn" onClick={onClose}>
            <FiX size={20} />
          </button>
        </div>

        <div className="post-detail-content">
          {/* Post Header */}
          <div className="post-detail-user-info" style={{cursor: 'pointer'}} onClick={() => handleNavigateProfile(post.user)}>
            <img 
              src={post.user?.avatarUrl || 'https://res.cloudinary.com/dgzn2ix8w/image/upload/v1745396073/Audivia/ddizjlgkux0eoifrsoco.avif'} 
              alt="avatar" 
              className="post-detail-avatar"
            />
            <div className="post-detail-user-details">
              <h4 className='post-username'>{post.user?.userName || 'Người dùng'}</h4>
              {post.location && <span className="post-detail-location"><BiLocationPlus color='red'/> {post.location}</span>}
              <span className="post-detail-time">
                {post.time}
              </span>
            </div>
          </div>

          {/* Post Content */}
          <div className="post-detail-text">
            <p>{post.content}</p>
          </div>

          {/* Post Images */}
          {post.images && post.images.length > 0 && (
            <div className="post-detail-images">
              {post.images.map((image, index) => (
                <img 
                  key={index} 
                  src={image} 
                  alt={`Post image ${index + 1}`}
                  className="post-detail-image"
                />
              ))}
            </div>
          )}

          {/* Post Actions */}
          <div className="post-detail-actions">
            <button 
              className={`action-btn ${isLiked ? 'liked' : ''}`}
              onClick={handleLike}
            >
              {isLiked ? <FaHeart size={20} /> : <FiHeart size={20} />}
              <span>{likesCount} lượt thích</span>
            </button>
            <button className="action-btn">
              <FiMessageCircle size={20} />
              <span>{comments.length} bình luận</span>
            </button>
          </div>

          {/* Comments Section */}
          <div className="comments-section">
            <h4>Bình luận</h4>
            
            {isLoadingComments ? (
              <div className="loading-comments">
                <p>Đang tải bình luận...</p>
              </div>
            ) : comments.length > 0 ? (
              <div className="comments-list">
                {comments.map((comment) => {
                  // Lấy member info, so sánh id không phân biệt kiểu
                  const member = members.find(m => String(m.id) === String(comment.createdBy));
                  return (
                    <div key={comment.id} className="comment-item">
                      {editingComment?.id === comment.id ? (
                        <div className="comment-edit-form">
                          <textarea
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                            className="comment-edit-input"
                            rows="2"
                          />
                          <div className="comment-edit-actions">
                            <button 
                              className="btn-save"
                              onClick={handleUpdateComment}
                            >
                              Lưu
                            </button>
                            <button 
                              className="btn-cancel"
                              onClick={cancelEditComment}
                            >
                              Hủy
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="comment-content">
                            <img 
                              src={member?.avatarUrl || 'https://res.cloudinary.com/dgzn2ix8w/image/upload/v1745396073/Audivia/ddizjlgkux0eoifrsoco.avif'} 
                              alt="avatar" 
                              className="comment-avatar"
                            />
                            <div className="comment-text">
                              <span className="comment-author">{member?.userName || comment.userName || 'Người dùng'}</span>
                              <p>{comment.content}</p>
                              <span className="comment-time">
                                {new Date(comment.createdAt).toLocaleDateString('vi-VN')}
                              </span>
                            </div>
                          </div>
                          {(member?.id === user?.id || comment.createdBy === user?.id) && (
                            <div className="comment-actions">
                              <button 
                                className="comment-action-btn"
                                onClick={() => startEditComment(comment)}
                              >
                                <FiEdit3 size={16} />
                              </button>
                              <button 
                                className="comment-action-btn delete"
                                onClick={() => handleDeleteComment(comment.id)}
                              >
                                <FiTrash2 size={16} />
                              </button>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="no-comments">
                <p>Chưa có bình luận nào. Hãy là người đầu tiên bình luận!</p>
              </div>
            )}

            {/* Comment Input */}
            <div className="comment-input-section">
              <img 
                src={user?.avatarUrl || 'https://res.cloudinary.com/dgzn2ix8w/image/upload/v1745396073/Audivia/ddizjlgkux0eoifrsoco.avif'} 
                alt="avatar" 
                className="comment-input-avatar"
              />
              <div className="comment-input-container">
                <textarea
                  className="comment-input"
                  placeholder="Thêm bình luận..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  disabled={isSubmittingComment}
                  rows="2"
                />
                <button 
                  className="comment-submit-btn"
                  onClick={handleComment}
                  disabled={isSubmittingComment || !commentText.trim()}
                >
                  {isSubmittingComment ? 'Đang đăng...' : <FiSend size={16} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showDeleteCommentModal && (
        <div className="delete-modal-overlay" onClick={() => setShowDeleteCommentModal(false)}>
          <div className="delete-modal" onClick={e => e.stopPropagation()}>
            <div className="delete-modal-header">
              <div className="delete-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="#EF4444"/>
                </svg>
              </div>
              <h3>Xóa bình luận</h3>
              <p>Bạn có chắc chắn muốn xóa bình luận này không? Hành động này không thể hoàn tác.</p>
            </div>
            <div className="delete-modal-actions">
              <button 
                className="delete-cancel-btn" 
                onClick={() => setShowDeleteCommentModal(false)}
              >
                Hủy
              </button>
              <button 
                className="delete-confirm-btn" 
                onClick={confirmDeleteComment}
              >
                Xóa bình luận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 