import React from "react";
import "./style.css";
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

export const Footer = () => {
  return (
    <div className="frame-1">
      <div className="logo">
      <img
          className="vector"
          alt="Vector"
          src="https://res.cloudinary.com/dgzn2ix8w/image/upload/v1745147401/Audivia/fxjo2mcpmqexcxkomtjd.png"
        />
      </div>
      <div className="name">Audivia</div>

      <div className="footer-content-wrapper">
        <div className="centered-footer-content">
          <div className="footer-links">
            <ul>
              <li><a href="#">TRANG CHỦ</a></li>
              <li><a href="#">KHÁM PHÁ</a></li>
              <li><a href="#">VỀ CHÚNG TÔI</a></li>
              <li><a href="#">BLOG</a></li>
              <li><a href="#">HỔ TRỢ</a></li>
            </ul>
          </div>

          <div className="social-icons">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="social-icon" size={40} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="social-icon" size={40} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="social-icon" size={40} />
            </a>
          </div>
          <div className="copyright">
            Copyright ©2025 All rights reserved
          </div>
        </div>
      </div>
    </div>
  );
};
