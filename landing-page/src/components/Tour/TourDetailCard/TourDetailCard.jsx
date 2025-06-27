import React from 'react'
import './style.css'
import { MdLocationOn } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import ROUTES from '../../../utils/routes'

export default function TourDetailCard({tour, isPurchased}) {
  const navigate = useNavigate()

  const handleButtonClick = () => {
    if (isPurchased) {
      // Nếu tour đã được mua, chuyển đến trang character với tourId
      navigate(ROUTES.CHARACTER.replace(':id', tour?.id))
    } else {
      // Nếu chưa mua, có thể thêm logic mua tour ở đây
      console.log('Mua tour:', tour?.id)
    }
  }

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
    <button onClick={handleButtonClick}>{isPurchased ? 'Bắt đầu' : 'Mua ngay'}</button>
  </div>
</div>
    
    </>
  )
}
