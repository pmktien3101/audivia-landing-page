import React from 'react';
import { FaStar, FaMapMarkerAlt, FaClock, FaMoneyBillWave, FaShoppingCart } from 'react-icons/fa';
import './TopPurchasedTours.css';

const TopPurchasedTours = ({ topPurchasedToursData }) => {
    if (!topPurchasedToursData || topPurchasedToursData.length === 0) {
        return (
            <div className="top-purchased-tours-container">
                <h3 className="top-section-title">Top 10 Tour Được Mua Nhiều Nhất</h3>
                <div className="top-no-data">Không có dữ liệu</div>
            </div>
        );
    }

    return (
        <div className="top-purchased-tours-container">
            <h3 className="top-section-title">
                <FaShoppingCart className="top-title-icon" />
                Top 10 Tour Được Mua Nhiều Nhất
            </h3>
            <div className="top-tours-grid">
                {topPurchasedToursData.map((item, index) => (
                    <div key={item.tour.id} className="top-tour-card">
                        <div className="top-tour-rank">#{index + 1}</div>
                        <div className="top-tour-image">
                            <img src={item.tour.thumbnailUrl} alt={item.tour.title} />
                        </div>
                        <div className="top-tour-info">
                            <h4 className="top-tour-title">{item.tour.title}</h4>
                            <div className="top-tour-location">
                                <FaMapMarkerAlt />
                                <span>{item.tour.location}</span>
                            </div>
                            <div className="top-tour-details">
                                <div className="top-tour-duration">
                                    <FaClock />
                                    <span>{item.tour.duration} giờ</span>
                                </div>
                                <div className="top-tour-price">
                                    <FaMoneyBillWave />
                                    <span>
                                        {item.tour.price === 0 
                                            ? 'Miễn phí' 
                                            : new Intl.NumberFormat('vi-VN', { 
                                                style: 'currency', 
                                                currency: 'VND' 
                                            }).format(item.tour.price)
                                        }
                                    </span>
                                </div>
                            </div>
                            <div className="top-tour-rating">
                                <FaStar className="top-star-icon" />
                                <span>{item.tour.avgRating.toFixed(1)}</span>
                                <span className="top-rating-count">({item.tour.ratingCount} đánh giá)</span>
                            </div>
                            <div className="top-purchase-count">
                                <FaShoppingCart />
                                <span>Đã mua: {item.purchaseCount} lần</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopPurchasedTours; 