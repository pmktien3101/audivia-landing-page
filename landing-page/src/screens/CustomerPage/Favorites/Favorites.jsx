import React, { useState } from 'react';
import './style.css';
import { BiHeart, BiTrash } from 'react-icons/bi';

const Favorites = () => {
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      name: 'Bãi biển Pandawa - Bali',
      location: 'Bali, Indonesia',
      image: 'https://res.cloudinary.com/dgzn2ix8w/image/upload/v1745147401/Audivia/fxjo2mcpmqexcxkomtjd.png',
      rating: 4.8,
      price: '2,500,000 VNĐ',
      description: 'Một trong những bãi biển đẹp nhất Bali với cát trắng và nước trong xanh.'
    },
    {
      id: 2,
      name: 'Đồi chè Cầu Đất',
      location: 'Đà Lạt, Việt Nam',
      image: 'https://res.cloudinary.com/dgzn2ix8w/image/upload/v1745147401/Audivia/fxjo2mcpmqexcxkomtjd.png',
      rating: 4.6,
      price: '1,800,000 VNĐ',
      description: 'Khám phá vẻ đẹp của những đồi chè xanh mướt tại Đà Lạt.'
    },
    {
      id: 3,
      name: 'Phố cổ Hội An',
      location: 'Quảng Nam, Việt Nam',
      image: 'https://res.cloudinary.com/dgzn2ix8w/image/upload/v1745147401/Audivia/fxjo2mcpmqexcxkomtjd.png',
      rating: 4.9,
      price: '1,200,000 VNĐ',
      description: 'Di sản văn hóa thế giới với kiến trúc cổ kính và ẩm thực đặc trưng.'
    }
  ]);

  const removeFavorite = (id) => {
    setFavorites(favorites.filter(item => item.id !== id));
  };

  return (
    <div className="favorites-container">
      <div className="favorites-header">
        <h1>Yêu thích</h1>
        <p>Những địa điểm bạn đã lưu</p>
      </div>
      
      {favorites.length === 0 ? (
        <div className="empty-favorites">
          <BiHeart size={80} className="empty-icon" />
          <h2>Chưa có địa điểm yêu thích</h2>
          <p>Hãy khám phá và lưu những địa điểm bạn quan tâm</p>
        </div>
      ) : (
        <div className="favorites-grid">
          {favorites.map((item) => (
            <div key={item.id} className="favorite-card">
              <div className="card-image">
                <img src={item.image} alt={item.name} />
                <button 
                  className="remove-btn"
                  onClick={() => removeFavorite(item.id)}
                  title="Xóa khỏi yêu thích"
                >
                  <BiTrash size={20} />
                </button>
              </div>
              
              <div className="card-content">
                <div className="card-header">
                  <h3>{item.name}</h3>
                  <div className="rating">
                    <span className="stars">★★★★★</span>
                    <span className="rating-number">{item.rating}</span>
                  </div>
                </div>
                
                <p className="location">{item.location}</p>
                <p className="description">{item.description}</p>
                
                <div className="card-footer">
                  <span className="price">{item.price}</span>
                  <button className="view-btn">Xem chi tiết</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites; 