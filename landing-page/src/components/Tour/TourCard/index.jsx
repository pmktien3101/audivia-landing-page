import React from "react";
import "./style.css";

export const TourCard = ({ 
  imageUrl, 
  country, 
  title, 
  price, 
  rating 
}) => {
  return (
    <div className="tour-card">
      <div className="tour-image-container">
        <img
          className="tour-image"
          alt={title}
          src={imageUrl}
        />
        <div className="tour-country-badge">
          <span>{country}</span>
        </div>
      </div>

      <div className="tour-info">
        <div className="tour-title-price">
          <h3 className="tour-title">{title}</h3>
          <p className="tour-price">{price == 0? 'Free' : price + ' VNĐ'}</p>
        </div>

        <div className="tour-rating">
          <span>{rating}</span>
          <img
            className="rating-star"
            alt="Rating star"
            src="https://c.animaapp.com/bADEbyrk/img/vector-31.svg"
          />
        </div>
      </div>
    </div>
  );
};