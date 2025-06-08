import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

export const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="header">
      <div className="frame-2">
        <img
          className="vector"
          alt="Vector"
          src="https://res.cloudinary.com/dgzn2ix8w/image/upload/v1745147401/Audivia/fxjo2mcpmqexcxkomtjd.png"
        />

        <div className="text-wrapper">Audivia</div>
      </div>

      <div className="navbar">
        <div className="text-wrapper-2">Trang Chủ</div>

        <div className="text-wrapper-2">Khám Phá</div>

        <div className="text-wrapper-2">Về chúng tôi</div>

        <div className="text-wrapper-2">Hổ Trợ</div>
      </div>

      <div className="frame-3">
        <div className="frame-4">
          <div className="text-wrapper-3" onClick={() => navigate("/auth/login")}>Đăng Nhập</div>
        </div>

        <div className="frame-5">
          <div className="text-wrapper-4" onClick={() => navigate("/auth/register")}>Đăng ký</div>
        </div>
      </div>
    </header>
  );
};
