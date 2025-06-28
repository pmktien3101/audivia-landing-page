import React from 'react'
import './style.css'
import { MdLocationOn } from 'react-icons/md'

export default function TourDetailCard({tour, isPurchased, onButtonClick, loading}) {
  return (
    <>
<div className='tour-detail-card-container'>
  {/* Thumbnail + Thông tin bên trái */}
  <div className="tour-detail-card-thumbnail">
    <img src={tour?.thumbnailUrl} alt="Tour thumbnail" />
    <div className='tour-detail-card-left'>
      <div className='tour-detail-card-location'><MdLocationOn style={{ marginRight: '6px', color: '#ff5722'}}/>{tour?.location}</div>
      <div className='tour-detail-card-rating'>
        {Array.from({ length: 5 }).map((_, index) => (
          <span key={index}>
            {index < Math.round(tour?.avgRating) ? '⭐' : '☆'}
          </span>
        ))}
        {typeof tour?.avgRating === 'number' && (
          <span style={{ marginLeft: 8 }}>{tour.avgRating.toFixed(1)}/5</span>
        )}
      </div>
      <div className='tour-detail-card-price'>{tour?.price === 0 ? 'Miễn phí' : `${tour?.price.toLocaleString()} VNĐ`}</div>
    </div>
  </div>

  {/* Phần trong suốt với icon du lịch */}
  <div className="tour-card-transparent-bg">
    <div className="travel-icons-container">
      <div className="travel-icon">✈️</div>
      <div className="travel-icon">🏨</div>
      <div className="travel-icon">🌴</div>
      <div className="travel-icon">🍴</div>
      <div className="travel-icon">📷</div>
    </div>
    <div className="tour-detail-card-overlay">
      <div className='tour-detail-card-title'>{tour?.title}</div>
      <div className='tour-detail-card-description'>{tour?.description}</div>
    </div>
  </div>

  {/* Footer */}
  <div className='tour-detail-card-footer'>
    <button onClick={onButtonClick} disabled={loading}>
      {loading ? 'Đang xử lý...' : (isPurchased ? 'Bắt đầu' : 'Mua ngay')}
    </button>
  </div>
</div>
    
    </>
  )
}
