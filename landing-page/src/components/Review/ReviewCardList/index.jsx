import React from 'react'
import './style.css'
import ReviewCard from '../ReviewCard';
export default function ReviewCardList({ reviews }) {
  return (
    <div className="review-list">
      {reviews?.length > 0 ? (
        reviews.map((review) => (
          <ReviewCard
            key={review.id} 
            review={review} 
          />
        ))
      ) : (
        <div className="no-reviews">Chưa có đánh giá nào</div>
      )}
    </div>
  );
}