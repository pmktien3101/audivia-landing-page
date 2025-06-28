import React from 'react'
import './style.css'
import { MdLocationOn } from 'react-icons/md'

export default function TourDetailCard({tour, isPurchased, onButtonClick, loading}) {
  return (
    <>
 <div className='tour-detail-card-vertical'>
      {/* Ảnh đại diện */}
      <div className='tour-detail-card-vertical-img'>
        <img src={tour?.thumbnailUrl} alt="Tour thumbnail" />
      </div>
      {/* Thông tin */}
      <div className='tour-detail-card-vertical-info'>
        <div className='tour-detail-card-modern-location'>
          <MdLocationOn style={{ marginRight: '6px', color: '#ff5722' }} />
          {tour?.location}
        </div>
        <div className='tour-detail-card-modern-title'>{tour?.title}</div>
        <div className='tour-detail-card-modern-description'>{tour?.description}</div>
        <div className='tour-detail-card-modern-rating-price'>
          <div className='tour-detail-card-modern-rating'>
            {Array.from({ length: 5 }).map((_, index) => (
              <span key={index} style={{ fontSize: 20 }}>
                {index < Math.round(tour?.avgRating) ? '⭐' : '☆'}
              </span>
            ))}
            {typeof tour?.avgRating === 'number' && (
              <span style={{ marginLeft: 8, fontWeight: 500 }}>{tour.avgRating.toFixed(1)}/5</span>
            )}
          </div>
          <div className='tour-detail-card-modern-price'>
            {tour?.price === 0 ? 'Miễn phí' : `${tour?.price.toLocaleString()} VNĐ`}
          </div>
        </div>

        <button className='tour-detail-card-modern-btn' onClick={onButtonClick} disabled={loading}>
          {loading ? 'Đang xử lý...' : (isPurchased ? 'Bắt đầu' : 'Mua ngay')}
        </button>
      </div>
    </div>

    </>
  )
}