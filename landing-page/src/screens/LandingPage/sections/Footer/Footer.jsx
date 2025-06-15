import React from "react";
import "./style.css";
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';

export const Footer = () => {
  return (
    <div className="frame-1">
      <div className="footer-container">
        <div className="footer-column">
        <h3>Về Audivia</h3>
          <p className="app-description">
            Ứng dụng trải nghiệm tour bằng âm thanh, giúp bạn khám phá những điểm đến thú vị qua những câu chuyện và âm thanh sống động.
          </p>
          <div className="logo">
            <img
              className="vector"
              alt="Vector"
              src="https://res.cloudinary.com/dgzn2ix8w/image/upload/v1745147401/Audivia/fxjo2mcpmqexcxkomtjd.png"
            />
          </div>
          
        </div>

        <div className="footer-column">
         <div className="footer-midle-column">
         <h3>Liên Kết</h3>
          <div className="footer-links">
            <ul>
              <li><a href="#">TRANG CHỦ</a></li>
              <li><a href="#">KHÁM PHÁ</a></li>
              <li><a href="#">VỀ CHÚNG TÔI</a></li>
              <li><a href="#">BLOG</a></li>
              <li><a href="#">HỖ TRỢ</a></li>
            </ul>
          </div>
          </div>
         
        </div>

        <div className="footer-column">
        <div className="footer-end-column">
        <h3>Liên Hệ</h3>
          <div className="social-icons">
            <a href="https://web.facebook.com/profile.php?id=61576847423900" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="social-icon" size={28} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="social-icon" size={28} />
            </a>
            <a href="https://www.tiktok.com/@audivia_fpt" target="_blank" rel="noopener noreferrer">
              <FaTiktok className="social-icon" size={28} />
            </a>
          </div>
          <div className="download-section">
          <h4>Tải Audivia Ngay</h4>

            <div className="download-buttons">
              <a href="https://drive.google.com/file/d/1_93nTq_gW40rKIYWG25H4otHZdNw5eEm/view?fbclid=IwY2xjawK7aEFleHRuA2FlbQIxMABicmlkETF4TUlyR0FjRUJhc2R2YU1mAR7a-rFzLFrDwXy30a20yqEzSt5wVJB4nR5MeVF6HcaUKJMzRQN6vUriHOwNSQ_aem_CRwc5wt_MzOsnV2Gia_hqg&pli=1" target="_blank" rel="noopener noreferrer" className="download-btn">
                <div className="download-circle">
                  <img src="https://res.cloudinary.com/dgzn2ix8w/image/upload/v1749978483/Audivia/fvim0tiyicrwpr3eaokf.png" alt="Link Tải" />
                </div>
              </a>
            </div>
          </div>
        </div>
        </div>

      </div>

      <div className="footer-divider"></div>
      <div className="copyright">
        Copyright ©2025 All rights reserved
      </div>
    </div>
  );
};
