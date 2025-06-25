import React, { useState, useEffect } from 'react';
import { FiX, FiImage, FiMapPin, FiSend, FiDelete } from 'react-icons/fi';
import './style.css';

const VIETNAM_PROVINCES = [
  'An Giang', 'Bà Rịa - Vũng Tàu', 'Bắc Giang', 'Bắc Kạn', 'Bạc Liêu', 'Bắc Ninh',
  'Bến Tre', 'Bình Định', 'Bình Dương', 'Bình Phước', 'Bình Thuận', 'Cà Mau',
  'Cần Thơ', 'Cao Bằng', 'Đà Nẵng', 'Đắk Lắk', 'Đắk Nông', 'Điện Biên',
  'Đồng Nai', 'Đồng Tháp', 'Gia Lai', 'Hà Giang', 'Hà Nam', 'Hà Nội',
  'Hà Tĩnh', 'Hải Dương', 'Hải Phòng', 'Hậu Giang', 'Hòa Bình', 'Hưng Yên',
  'Khánh Hòa', 'Kiên Giang', 'Kon Tum', 'Lai Châu', 'Lâm Đồng', 'Lạng Sơn',
  'Lào Cai', 'Long An', 'Nam Định', 'Nghệ An', 'Ninh Bình', 'Ninh Thuận',
  'Phú Thọ', 'Phú Yên', 'Quảng Bình', 'Quảng Nam', 'Quảng Ngãi', 'Quảng Ninh',
  'Quảng Trị', 'Sóc Trăng', 'Sơn La', 'Tây Ninh', 'Thái Bình', 'Thái Nguyên',
  'Thanh Hóa', 'Thừa Thiên Huế', 'Tiền Giang', 'TP Hồ Chí Minh', 'Trà Vinh',
  'Tuyên Quang', 'Vĩnh Long', 'Vĩnh Phúc', 'Yên Bái'
];

export const PostModal = ({ visible, onClose, onSave, initialData = {}, isEdit = false }) => {
  const [content, setContent] = useState('');
  const [location, setLocation] = useState('');
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showProvinceSelect, setShowProvinceSelect] = useState(false);
  const [provinceSearch, setProvinceSearch] = useState('');

  useEffect(() => {
    if (visible) {
      setContent(initialData.content || '');
      setLocation(initialData.location || '');
      setImages(initialData.images || []);
    }
  }, [visible]);

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
      if (!isEdit) {
        setContent('');
        setLocation('');
        setImages([]);
      }
    } catch (error) {
      console.error(isEdit ? 'Lỗi cập nhật bài viết:' : 'Lỗi tạo bài viết:', error);
      alert('Có lỗi xảy ra khi ' + (isEdit ? 'cập nhật' : 'tạo') + ' bài viết');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredProvinces = VIETNAM_PROVINCES.filter(p =>
    p.toLowerCase().includes(provinceSearch.toLowerCase())
  );

  if (!visible) return null;

  return (
    <div className="post-modal-overlay" onClick={onClose}>
      <div className="post-modal" onClick={(e) => e.stopPropagation()}>
        <div className="post-modal-header">
          <h3>{isEdit ? 'Chỉnh sửa bài viết' : 'Tạo bài viết mới'}</h3>
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
              <div style={{marginLeft:8, color: 'red'}} onClick={() => setLocation('')}><FiDelete/></div>
            </div>
          )}

          {images.length > 0 && (
            <div className="images-preview">
              {images.map((image, index) => (
                <div key={index} className="image-preview-item">
                  <img 
                    src={typeof image === 'string' ? image : URL.createObjectURL(image)} 
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

          {/* Province select dropdown */}
          {showProvinceSelect && (
            <div className="province-select-modal">
              <input
                type="text"
                placeholder="Tìm tỉnh/thành phố..."
                value={provinceSearch}
                onChange={e => setProvinceSearch(e.target.value)}
                className="province-search-input"
                autoFocus
              />
              <div className="province-list">
                {filteredProvinces.length === 0 && (
                  <div className="province-item">Không tìm thấy</div>
                )}
                {filteredProvinces.map(province => (
                  <div
                    key={province}
                    className="province-item"
                    onClick={() => {
                      setLocation(province);
                      setShowProvinceSelect(false);
                      setProvinceSearch('');
                    }}
                  >
                    {province}
                  </div>
                ))}
              </div>
              <button className="province-cancel-btn" onClick={() => setShowProvinceSelect(false)}>Hủy</button>
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
            
            <button className="action-btn" onClick={() => setShowProvinceSelect(true)}>
              <FiMapPin size={20} />
              <span>Check in</span>
            </button>
          </div>

          <button 
            className="submit-btn"
            onClick={handleSubmit}
            disabled={isSubmitting || !content.trim()}
          >
            {isSubmitting ? (isEdit ? 'Đang cập nhật...' : 'Đang đăng...') : (isEdit ? 'Cập nhật' : 'Đăng bài')}
            <FiSend size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
