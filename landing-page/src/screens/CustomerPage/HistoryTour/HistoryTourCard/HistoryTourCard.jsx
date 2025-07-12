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
      <div className="tour-image-container">
        <img 
          src={tour.tour.thumbnailUrl} 
          alt={tour.tour.title}
          className="tour-thumbnail"
        />
      </div>
      
      <div className="tour-info">
        <h3 className="purchased-tour-name">{tour.tour.title}</h3>
        <p className="purchase-date">Đã mua vào ngày {formatDate(tour.createdAt)}</p>
        <p className="tour-amount">{formatMoney(tour.amount)} VNĐ</p>
        
        <button 
          className="start-tour-btn"
          onClick={handleStartTour}
        >
          Bắt đầu tour
        </button>
      </div>
    </div>
  )
}
