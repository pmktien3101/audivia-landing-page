import React, { useState } from 'react';
import { HiOutlineTrash, HiOutlineCalendar } from 'react-icons/hi';
import { IoStar } from 'react-icons/io5';
import './style.css';
import { useNavigate } from 'react-router-dom';

const SavedTourCard = ({
  tour,
  savedTime,
  onDelete,
  onSchedule,
  savedTourId,
  plannedTime
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()

  const handleDelete = async (e) => {
    e.stopPropagation();
    setIsLoading(true);
    await onDelete(savedTourId);
  };

  const handleSchedule = (e) => {
    e.stopPropagation();
    onSchedule()
  };

  const handleCardClick = () => {
    navigate(`/tour-detail/${tour.id}`);
  };

  return (
    <div className="saved-tour-card" onClick={handleCardClick}>
      {/* Tour Image */}
      <div className="tour-image-container">
        <img
          className="tour-image"
          alt={tour.title}
          src={tour.thumbnailUrl || tour.imageUrl}
        />
        {plannedTime && (
          <div className="planned-time-badge">
            <HiOutlineCalendar size={16} />
            <span>{new Date(plannedTime).toLocaleDateString('vi-VN')}</span>
          </div>
        )}
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
            <span className="rating-text">{tour.avgRating?.toFixed(1) || tour.rating} <span className="rating-count">{`(${tour.ratingCount} đánh giá)`}</span></span>
          </div>
        </div>

        <div className="tour-footer">
          <div className="saved-time">
            Đã lưu {savedTime}
          </div>

          <div className="tour-actions">
            <button
              className={`action-btn schedule-btn ${plannedTime ? 'has-date' : ''}`}
              onClick={handleSchedule}
              title={plannedTime ? 'Đổi ngày' : 'Lên lịch'}
            >
              <HiOutlineCalendar size={18} />
              <span className="action-text">{plannedTime ? 'Đổi ngày' : 'Lên lịch'}</span>
            </button>
            <button
              className="action-btn delete-btn"
              onClick={handleDelete}
              title="Xóa tour"
              disabled={isLoading}
            >
              <HiOutlineTrash size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedTourCard; 