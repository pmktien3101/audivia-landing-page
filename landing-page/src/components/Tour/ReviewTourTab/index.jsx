import React from 'react';
import './style.css'
import ReviewCardList from '../../Review/ReviewCardList';
export default function ReviewTourTab({reviews}) {
  return (
    <div className="review-tour-tab">
      <h2>Đánh giá của khách hàng</h2>
      <ReviewCardList reviews={reviews} />
  </div>
  )
} 