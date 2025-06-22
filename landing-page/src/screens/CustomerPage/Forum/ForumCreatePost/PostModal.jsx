import React, { useState } from 'react';
import { FiX, FiImage, FiMapPin, FiSend } from 'react-icons/fi';
import './style.css';

export const PostModal = ({ visible, onClose, onSave }) => {
  const [content, setContent] = useState('');
  const [location, setLocation] = useState('');
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(prev => [...prev, ...files]);
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!content.trim()) {
      alert('Vui lòng nhập nội dung bài viết');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSave({
        content: content.trim(),
        location: location.trim(),
        images: images
      });
      
      // Reset form
      setContent('');
      setLocation('');
      setImages([]);
    } catch (error) {
      console.error('Lỗi tạo bài viết:', error);
      alert('Có lỗi xảy ra khi tạo bài viết');
    } finally {
      setIsSubmitting(false);
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
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
          />

          {location && (
            <div className="location-display">
              <FiMapPin size={16} />
              <span>{location}</span>
            </div>
          )}

          {images.length > 0 && (
            <div className="images-preview">
              {images.map((image, index) => (
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
            
            <button className="action-btn" onClick={() => {
              const loc = prompt('Nhập địa điểm:');
              if (loc) setLocation(loc);
            }}>
              <FiMapPin size={20} />
              <span>Check in</span>
            </button>
          </div>

          <button 
            className="submit-btn"
            onClick={handleSubmit}
            disabled={isSubmitting || !content.trim()}
          >
            {isSubmitting ? 'Đang đăng...' : 'Đăng bài'}
            <FiSend size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
