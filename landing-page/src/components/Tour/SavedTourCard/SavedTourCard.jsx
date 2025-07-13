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
      <div className="saved-tour-card-image-container">
        <img
          className="saved-tour-card-image"
          alt={tour?.title}
          src={tour?.thumbnailUrl}
        />
        {plannedTime && (
          <div className="saved-tour-card-planned-time-badge">
            <HiOutlineCalendar size={16} />
            <span>{new Date(plannedTime).toLocaleDateString('vi-VN')}</span>
          </div>
        )}
      </div>

      {/* Tour Content */}
      <div className="saved-tour-card-content">
        <div className="saved-tour-card-header">
          <div className="saved-tour-card-info">
            <h3 className="saved-tour-card-name">{tour?.title}</h3>
            <div className="saved-tour-card-price">
              <span>{tour?.price == 0 ? 'Free' : tour?.price + " VNĐ"}</span>
            </div>
          </div>

          <div className="saved-tour-card-rating">
            <IoStar className="saved-tour-card-star-icon" />
            <span className="saved-tour-card-rating-text">{tour?.avgRating?.toFixed(1) || tour?.rating} <span className="saved-tour-card-rating-count">{`(${tour?.ratingCount} đánh giá)`}</span></span>
          </div>
        </div>

        <div className="saved-tour-card-footer">
          <div className="saved-tour-card-saved-time">
            Đã lưu {savedTime}
          </div>

          <div className="saved-tour-card-actions">
            <button
              className={`saved-tour-card-action-btn saved-tour-card-schedule-btn ${plannedTime ? 'has-date' : ''}`}
              onClick={handleSchedule}
              title={plannedTime ? 'Đổi ngày' : 'Lên lịch'}
            >
              <HiOutlineCalendar size={18} />
              <span className="saved-tour-card-action-text">{plannedTime ? 'Đổi ngày' : 'Lên lịch'}</span>
            </button>
            <button
              className="saved-tour-card-action-btn saved-tour-card-delete-btn"
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