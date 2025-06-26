import React, { useState } from "react";
import "./style.css";

export const Tittle = ({ hideActions = false }) => {
  const [showModal, setShowModal] = useState(false);
  
  const handleDemoClick = () => {
    setShowModal(true);
  };
  const handleStart = () => {
    window.location.href = "https://web.audivia.vn/login";
  }

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="tittle">
      <div className="image">
        <div className="frame-6">
          <div className="text-wrapper-5">Khám phá thế giới!</div>
        </div>
        <p className="from-southeast-asia">
          <span className="span">
            <br />
            Audio Tour 
            <br />
          </span>
          <span className="text-wrapper-6">– Hướng dẫn viên luôn bên bạn</span>
        </p>

        <p className="p">
          Nơi mỗi điểm đến là một câu chuyện được kể bằng âm thanh sống động
        </p>

        {!hideActions && (
          <div className="frame-7">
            <div className="frame-8" onClick={handleStart} style={{cursor:'pointer'}}>
              <div className="text-wrapper-7">Bắt Đầu</div>
            </div>

            <div className="frame-9" onClick={handleDemoClick} style={{ cursor: 'pointer' }}>
              <div className="text-wrapper-8">Xem Demo</div>
              <img
                className="vector-2"
                alt="Vector"
                src="https://c.animaapp.com/bADEbyrk/img/vector-9.svg"
              />
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }}
          onClick={handleCloseModal}
        >
          <div 
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '10px',
              maxWidth: '90%',
              width: '800px',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseModal}
              style={{
                position: 'absolute',
                right: '10px',
                top: '10px',
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: '#333'
              }}
            >
              ×
            </button>
            <video 
              controls 
              style={{ 
                width: '100%',
                borderRadius: '5px'
              }}
            >
              <source 
                src="https://res.cloudinary.com/dgzn2ix8w/video/upload/v1749889095/Audivia/vpjuulywloka1r9bopuf.mp4" 
                type="video/mp4" 
              />
              Trình duyệt của bạn không hỗ trợ thẻ video.
            </video>
          </div>
        </div>
      )}

      <div className="overlap-wrapper">
        <div className="overlap">
          <div className="vector-3">
            <img
              className="vector-4"
              alt="Vector"
              src="https://c.animaapp.com/bADEbyrk/img/vector-10.svg"
            />
            <div className="overlap-group">
              <img
                className="vector-5"
                alt="Vector"
                src="https://c.animaapp.com/bADEbyrk/img/vector-11.svg"
              />
              <img
                className="vector-6"
                alt="Vector"
                src="https://c.animaapp.com/bADEbyrk/img/vector-12.svg"
              />
            </div>
            <img
              className="vector-7"
              alt="Vector"
              src="https://c.animaapp.com/bADEbyrk/img/vector-13.svg"
            />
            <img
              className="plane"
              alt="Plane"
              src="https://c.animaapp.com/bADEbyrk/img/plane.svg"
            />
          </div>

          <div className="images">
            <img
              className="main-person-image"
              alt="Main Person Image"
              src="https://res.cloudinary.com/dgzn2ix8w/image/upload/v1748855358/Audivia/bricvqfr3ew3krrclxmr.png"
            />
          </div>

          <div className="info-cards">
            <div className="card customers">
              <div className="icon">🎧</div>
              <div className="text-wrapper">Nghe</div>
            </div>
            <div className="card customers">
              <div className="icon">✨</div>
              <div className="text-wrapper">Cảm</div>
            </div>
            <div className="card customers">
              <div className="icon">🗺️</div>
              <div className="text-wrapper">Khám phá</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
