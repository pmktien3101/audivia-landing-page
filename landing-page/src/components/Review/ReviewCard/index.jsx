import React from 'react'
import './style.css'
export default function ReviewCard({review}) {
  return (
    <div className='review-container'>
        <div className='review-header'>
            <div className='review-header-left'>
                <div className='review-user-avatar'>
                    <img src={review?.avatarUrl}/>
                </div>
                <div className='review-user-info'>
                    <div className='review-user-name'>{review?.userName}</div>
                    <div className='review-user-rating'>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <span key={index}>
                            {index < review?.rating ? '★' : '☆'}
                            </span>
                        ))}
                    </div> 
                </div>
            </div>
            <div className='review-header-right'>
                {review?.createdAt ? new Date(review.createdAt).toLocaleDateString('vi-VN') : ''}
            </div>
        </div>
        <div className='review-content'>
            {review?.content}
        </div>
    </div>
  )
}
