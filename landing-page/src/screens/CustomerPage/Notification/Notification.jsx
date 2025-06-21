import React from 'react';
import './style.css';

const Notification = () => {
  return (
    <div className="notification-container">
      <div className="notification-header">
        <h1>Thông báo</h1>
        <p>Quản lý thông báo của bạn</p>
      </div>
      
      <div className="notification-content">
        <div className="notification-filters">
          <button className="filter-btn active">Tất cả</button>
          <button className="filter-btn">Chưa đọc</button>
          <button className="filter-btn">Đã đọc</button>
        </div>
        
        <div className="notification-list">
          <div className="notification-item unread">
            <div className="notification-icon">
              <div className="icon-circle">📢</div>
            </div>
            <div className="notification-content">
              <h3>Chào mừng bạn đến với Audivia!</h3>
              <p>Cảm ơn bạn đã tham gia cộng đồng du lịch của chúng tôi.</p>
              <span className="notification-time">2 giờ trước</span>
            </div>
          </div>
          
          <div className="notification-item">
            <div className="notification-icon">
              <div className="icon-circle">🎯</div>
            </div>
            <div className="notification-content">
              <h3>Tour mới: Khám phá Đà Lạt</h3>
              <p>Tour mới đã được thêm vào danh sách. Hãy khám phá ngay!</p>
              <span className="notification-time">1 ngày trước</span>
            </div>
          </div>
          
          <div className="notification-item">
            <div className="notification-icon">
              <div className="icon-circle">💬</div>
            </div>
            <div className="notification-content">
              <h3>Bình luận mới</h3>
              <p>Bạn có bình luận mới trong bài viết "Kinh nghiệm du lịch Bali".</p>
              <span className="notification-time">3 ngày trước</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification; 