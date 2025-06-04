import React from "react";
import "./style.css";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

export const Footer = () => {
  return (
    <div className="frame-1">
      <div className="footer-content-wrapper">
        <div className="footer-left-section">
          <div className="frame-38">
            <img
              className="vector-10"
              alt="Vector"
              src="https://res.cloudinary.com/dgzn2ix8w/image/upload/v1745147401/Audivia/fxjo2mcpmqexcxkomtjd.png"
            />
            <div className="text-wrapper-28">Audivia</div>
          </div>

          <p className="text-wrapper-29">
            Audivia là nền tảng du lịch và khám phá bằng âm thanh tại Việt Name,
            chúng tôi mang đến cho bạn trải nghiệm khám phá các điểm đến một cách sống động được hướng dẫn bằng âm thanh
          </p>

          <div className="frame-39">
            <div className="text-wrapper-30">Tải Ứng Dụng</div>
            <img
              className="frame-40"
              alt="Frame"
              src="https://c.animaapp.com/bADEbyrk/img/frame-81.svg"
            />
          </div>
        </div>

        <div className="footer-right-section">
          {/* Placeholder content */}
          <div className="footer-links">
            <h4>Liên Kết Nhanh</h4>
            <ul>
              <li><a href="#">Về chúng tôi</a></li>
              <li><a href="#">Dịch vụ</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Liên Hệ</a></li>
            </ul>
          </div>

          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="social-icon" size={40} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="social-icon" size={40} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="social-icon" size={40} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="social-icon" size={40} />
            </a>
          </div>
          <div className="copyright">
            © 2025 Audivia. All rights reserved
          </div>
        </div>
      </div>
    </div>
  );
};
