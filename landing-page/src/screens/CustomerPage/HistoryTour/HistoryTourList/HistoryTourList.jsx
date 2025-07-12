import React from 'react'
import HistoryTourCard from '../HistoryTourCard/HistoryTourCard'
import './style.css'

export default function HistoryTourList({ tours = [], loading = false, error = null }) {
  if (loading) {
    return (
      <div className="history-tour-loading">
        <div className="loading-spinner"></div>
        <p>Đang tải lịch sử tour...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="history-tour-error">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>
          Thử lại
        </button>
      </div>
    )
  }

  if (tours.length === 0) {
    return (
      <div className="history-tour-empty">
        <div className="empty-icon">📋</div>
        <h3>Chưa có lịch sử tour nào</h3>
        <p>Hãy mua và trải nghiệm các tour để xem lịch sử ở đây!</p>
      </div>
    )
  }

  return (
    <div className="history-tour-list">
      <div className="history-tour-header">
        <h2>Lịch sử tour của bạn</h2>
        <span className="tour-count">{tours.length} tour</span>
      </div>
      
      <div className="history-tour-grid">
        {tours.map((tour, index) => (
          <HistoryTourCard 
            key={tour.id || index} 
            tour={tour} 
          />
        ))}
      </div>
    </div>
  )
}
