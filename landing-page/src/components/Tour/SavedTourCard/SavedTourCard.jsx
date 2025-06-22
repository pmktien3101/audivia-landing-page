import React, { useState } from 'react';
import { HiOutlineTrash, HiOutlineCalendar } from 'react-icons/hi';
import { IoStar } from 'react-icons/io5';
import './style.css';

const SavedTourCard = ({ 
  tour, 
  savedTime, 
  onDelete, 
  onSchedule,
  onCardClick,
  savedTourId
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Debug: Log tour object structure
  console.log('Tour object:', tour);
  console.log('Tour ID:', tour?.id);
  console.log('Tour properties:', Object.keys(tour || {}));

  const handleDelete = async (e) => {
    e.stopPropagation();
    setIsLoading(true);
    await onDelete(savedTourId);
  };

  const handleSchedule = (e) => {
    e.stopPropagation();
    if (onSchedule) {
      onSchedule(tour.id);
    }
  };

  const handleCardClick = () => {
    if (onCardClick) {
      onCardClick(tour.id);
    }
  };

  return (
    <div className="saved-tour-card" onClick={handleCardClick}>
      {/* Options Button */}
      <div className="tour-options-container">
        <button 
          className="tour-options-btn"
          onClick={(e) => {
            e.stopPropagation();
            setShowOptions(!showOptions);
          }}
        >
          <span className="options-dots">•••</span>
        </button>
        
        {showOptions && (
          <div className="tour-options-menu">
            <button 
              className="option-item delete-option"
              onClick={handleDelete}
              disabled={isLoading}
            >
              <HiOutlineTrash />
              <span>{isLoading ? 'Đang xóa...' : 'Xóa'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Tour Image */}
      <div className="tour-image-container">
        <img
          className="tour-image"
          alt={tour.title}
          src={tour.thumbnailUrl || tour.imageUrl}
        />
      </div>

      {/* Tour Content */}
      <div className="tour-content">
        <div className="tour-header">
          <div className="tour-info">
            <h3 className="tour-name">{tour.title}</h3>
            <div className="saved-tour-price">
              <span>{tour.price == 0 ? 'Free' : tour.price + " VNĐ"}</span>
            </div>
          </div>
          
          <div className="saved-tour-rating">
            <IoStar className="star-icon" />
            <span className="rating-text">{tour.avgRating?.toFixed(1) || tour.rating}</span>
          </div>
        </div>

        <div className="tour-footer">
          <div className="saved-time">
            Đã lưu {savedTime}
          </div>
          
          <div className="tour-actions">
            <button 
              className="action-btn schedule-btn"
              onClick={handleSchedule}
              title="Lên lịch"
            >
              <HiOutlineCalendar size={18}/>
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedTourCard; 