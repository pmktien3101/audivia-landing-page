import React from 'react'
import { useNavigate } from 'react-router-dom'
import { formatMoney } from '../../../../utils/formatter/formatter'
import './style.css'

export default function HistoryTourCard({tour}) {
  const navigate = useNavigate()

  const handleStartTour = () => {
    navigate(`/tour-detail/${tour.tour.id}`)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="history-tour-card">
      <div className="history-tour-card-image-container">
        <img 
          src={tour.tour.thumbnailUrl} 
          alt={tour.tour.title}
          className="history-tour-card-thumbnail"
        />
      </div>
      
      <div className="history-tour-card-info">
        <h3 className="history-tour-card-name">{tour.tour.title}</h3>
        <p className="history-tour-card-date">Đã mua vào ngày {formatDate(tour.createdAt)}</p>
        <p className="history-tour-card-amount">{formatMoney(tour.amount)} VNĐ</p>
        
        <button 
          className="history-tour-card-btn"
          onClick={handleStartTour}
        >
          Bắt đầu tour
        </button>
      </div>
    </div>
  )
}
