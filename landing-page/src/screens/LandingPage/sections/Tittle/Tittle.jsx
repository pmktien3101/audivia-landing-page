import React from "react";
import "./style.css";

export const Tittle = () => {
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

        <div className="frame-7">
          <div className="frame-8">
            <div className="text-wrapper-7">Bắt Đầu</div>
          </div>

          <div className="frame-9">
            <div className="text-wrapper-8">Xem Demo</div>

            <img
              className="vector-2"
              alt="Vector"
              src="https://c.animaapp.com/bADEbyrk/img/vector-9.svg"
            />
          </div>
        </div>
      </div>

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
            {/* Placeholder for the new circular image */}
            <img
              className="main-person-image"
              alt="Main Person Image"
              src="https://res.cloudinary.com/dgzn2ix8w/image/upload/v1748855358/Audivia/bricvqfr3ew3krrclxmr.png"
            />
          </div>

          {/* Added missing elements */} 
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
