import React from 'react';
import SavedTourCard from '../SavedTourCard';

import './style.css';

const SavedToursList = ({ 
  savedTours = [], 
  loading = false, 
  error = null,
  onTourClick, 
  onScheduleClick,
  onDelete,
  onToggleFavorite
}) => {




  const handleSchedule = (tourId) => {
    if (onScheduleClick) {
      onScheduleClick(tourId);
    }
  };

  const handleTourClick = (tourId) => {
    if (onTourClick) {
      onTourClick(tourId);
    }
  };

  if (loading) {
    return (
      <div className="saved-tours-loading">
        <div className="loading-spinner"></div>
        <p>Đang tải danh sách tour yêu thích...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="saved-tours-error">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>
          Thử lại
        </button>
      </div>
    );
  }

  if (savedTours.length === 0) {
    return (
      <div className="saved-tours-empty">
        <div className="empty-icon">💔</div>
        <h3>Chưa có tour yêu thích nào</h3>
        <p>Hãy khám phá và lưu những tour bạn thích!</p>
      </div>
    );
  }

  return (
    <div className="saved-tours-list">
      <div className="saved-tours-header">
        <h2>Tour yêu thích của bạn</h2>
        <span className="tour-count">{savedTours.length} tour</span>
      </div>
      
      <div className="saved-tours-grid">
      {savedTours.map((savedTour) => (
          <SavedTourCard
            key={savedTour.id}
            savedTourId={savedTour.id}
            tour={savedTour.tour}
            savedTime={savedTour.timeAgo || 'gần đây'}
            onDelete={onDelete} // <- gọi trực tiếp từ props
            onToggleFavorite={onToggleFavorite}
            onSchedule={handleSchedule}
            onCardClick={handleTourClick}
            plannedTime={savedTour.plannedTime}
          />
        ))}
      </div>
    </div>
  );
};

export default SavedToursList; 