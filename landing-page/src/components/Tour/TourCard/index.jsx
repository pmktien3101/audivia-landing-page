import React, { useEffect, useState } from "react";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import saveTourService from "../../../services/saveTour";

import "./style.css";
import userService from "../../../services/user";
import { useNavigate } from "react-router-dom";
import { formatMoney } from "../../../utils/formatter/formatter";

export const TourCard = ({
  imageUrl,
  country,
  title,
  price,
  rating,
  tourId,
  isSaved = false,
  onToggleFavorite,

}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState();
  const navigate = useNavigate();
  // Debug: Log all props
  // console.log('TourCard Props:', { imageUrl, country, title, price, rating, tourId, isSaved });

  const fetchCurrentUser = async () => {
    try {
      const result = await userService.getCurrentUser();
      if (result) {
        setUser(result);
      }
    } catch (error) {
      console.error('Lỗi lấy thông tin người dùng:', error);
    }
  };
  useEffect(() => {
    fetchCurrentUser()
  }, [])
  const handleToggleFavorite = async (e) => {
    e.stopPropagation(); // Ngăn chặn event bubble lên parent

    setIsLoading(true);
    try {
      // Lấy user hiện tại nếu chưa có
      let currentUser = user;
      if (!currentUser?.id) {
        const userResult = await userService.getCurrentUser();
        if (!userResult?.userId) {
          console.error('User not logged in');
          setIsLoading(false);
          return;
        }
        currentUser = userResult;
      }

      // Luôn gọi saveTour API với plannedTime
      const response = await saveTourService.saveTour(currentUser.id, tourId);

      // Gọi callback để parent component cập nhật state
      if (onToggleFavorite) {
        onToggleFavorite(tourId, !isSaved);
      }
    } catch (error) {
      console.error('Error saving tour:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardClick = () => {
    navigate(`/tour-detail/${tourId}`);
  };

  return (
    <div className="tour-card" onClick={handleCardClick}>
      <div className="tour-image-container">
        <img
          className="tour-image"
          alt={title}
          src={imageUrl}
        />
        <div className="tour-country-badge">
          <span>{country}</span>
        </div>

        {/* Favorite Button */}
        <button
          className="tour-favorite-btn"
          onClick={handleToggleFavorite}
          disabled={isLoading}
          aria-label={isSaved ? "Bỏ lưu tour" : "Lưu tour"}
        >
          {isLoading ? (
            <div className="loading-spinner"></div>
          ) : isSaved ? (
            <HiHeart className="heart-icon filled" />
          ) : (
            <HiOutlineHeart className="heart-icon outline" />
          )}
        </button>
      </div>

      <div className="tour-info">
        <div className="tour-title-price">
          <h3 className="tour-title">{title}</h3>
          <p className="tour-price">{price == 0 ? 'Free' : formatMoney(price) + ' VNĐ'}</p>
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