import React from 'react';
import { FiX, FiImage, FiMapPin, FiSend } from 'react-icons/fi';
import './style.css';;

export const PostModal = ({ visible, onClose, onSave, isSubmitting, postData, setPostData }) => {


  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setPostData(prev => ({ ...prev, images: [...prev.images, ...files] }));
  };

  const removeImage = (index) => {
    setPostData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleContentChange = (e) => {
    setPostData(prev => ({ ...prev, content: e.target.value }));
  };

  const handleCheckIn = () => {
    const loc = prompt('Nhập địa điểm:');
    if (loc) {
      setPostData(prev => ({ ...prev, location: loc }));
    }
  };

  if (!visible) return null;

  return (
    <div className="post-modal-overlay" onClick={onClose}>
      <div className="post-modal" onClick={(e) => e.stopPropagation()}>
        <div className="post-modal-header">
          <h3>Tạo bài viết mới</h3>
          <button className="close-btn" onClick={onClose}>
            <FiX size={20} />
          </button>
        </div>

        <div className="post-modal-content">
          <textarea
            className="post-content-input"
            placeholder="Bạn đang nghĩ gì?"
            value={postData.content}
            onChange={handleContentChange}
            rows={4}
          />

          {postData.location && (
            <div className="location-display">
              <FiMapPin size={16} />
              <span>{postData.location}</span>
            </div>
          )}

          {postData.images.length > 0 && (
            <div className="images-preview">
              {postData.images.map((image, index) => (
                <div key={index} className="image-preview-item">
                  <img 
                    src={URL.createObjectURL(image)} 
                    alt={`Preview ${index + 1}`} 
                  />
                  <button 
                    className="remove-image-btn"
                    onClick={() => removeImage(index)}
                  >
                    <FiX size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="post-modal-actions">
          <div className="action-buttons">
            <label className="action-btn">
              <FiImage size={20} />
              <span>Thêm ảnh</span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
            </label>
            
            <button className="action-btn" onClick={handleCheckIn}>
              <FiMapPin size={20} />
              <span>Check in</span>
            </button>
          </div>

          <button 
            className="submit-btn"
            onClick={onSave}
            disabled={isSubmitting || !postData.content.trim()}
          >
            {isSubmitting ? 'Đang đăng...' : 'Đăng bài'}
            <FiSend size={16} />
          </button>
        </div>
      </div>
    </div>
    );
  };