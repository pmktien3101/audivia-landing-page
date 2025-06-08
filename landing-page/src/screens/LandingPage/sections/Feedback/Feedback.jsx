import React, { useState } from "react";
import "./style.css";

export const Feedback = () => {
  const [currentFeedbackIndex, setCurrentFeedbackIndex] = useState(0);

  const feedbackData = [
    {
      avatar: "https://c.animaapp.com/bADEbyrk/img/ellipse-8@2x.png",
      name: "Loc Bui",
      title: "Người đam mê du lịch",
      rating: "https://c.animaapp.com/bADEbyrk/img/frame-62.svg", 
      text:
        "Tôi thích Audivia, đây là một ứng dụng hay để có thể trải nghiệm du lịch tự túc",
    },
    {
      avatar: "https://res.cloudinary.com/dgzn2ix8w/image/upload/v1749048409/Audivia/j5iyav9zc3ydctbng8qr.png",
      name: "Tien Pham",
      title: "Đi đây đi đó",
      rating: "https://c.animaapp.com/bADEbyrk/img/frame-62.svg",
      text:
        "Trải nghiệm tuyệt vời, cảm thấy đắm chìm vào từng lời dẫn dắt",
    },
    {
      avatar: "https://res.cloudinary.com/dgzn2ix8w/image/upload/v1749048409/Audivia/j5iyav9zc3ydctbng8qr.png", 
      name: "Hoa Vo",
      title: "Người thích trải nghiệm",
      rating: "https://c.animaapp.com/bADEbyrk/img/frame-62.svg",
      text:
        "Chuyến đi kiểu này rất độc đáo, khuyến khích mọi người trải nghiệm thử",
    },
  ];

  const handlePrevClick = () => {
    setCurrentFeedbackIndex(
      (prevIndex) =>
        (prevIndex - 1 + feedbackData.length) % feedbackData.length
    );
  };

  const handleNextClick = () => {
    setCurrentFeedbackIndex((prevIndex) => (prevIndex + 1) % feedbackData.length);
  };

  const currentFeedback = feedbackData[currentFeedbackIndex];

  return (
    <div className="group">
      <div className="overlap-2">
        <div className="frame-10">
          <div className="services">
            <div className="text-wrapper-9">NHỮNG CHỨNG NHẬN</div>

            <div className="text-wrapper-10">Sự tin tưởng của khách hàng</div>
          </div>

          <div className="frame-11">
            <img
              className="ellipse"
              alt="Ellipse"
              src={currentFeedback.avatar}
            />

            <div className="frame-12">
              <div className="frame-13">
                <div className="text-wrapper-11">{currentFeedback.name}</div>

                <div className="text-wrapper-12">{currentFeedback.title}</div>
              </div>

              <img
                className="frame-14"
                alt="Frame"
                src={currentFeedback.rating}
              />

              <p className="text-wrapper-13">
                {currentFeedback.text}
              </p>
            </div>
          </div>

          <div className="frame-15">
            {feedbackData.map((_, index) => (
              <div
                key={index}
                className={
                  index === currentFeedbackIndex ? "ellipse-3 active" : "ellipse-2"
                }
                onClick={() => setCurrentFeedbackIndex(index)}
              />
            ))}
          </div>
        </div>

        <img
          className="frame-16"
          alt="Frame"
          src="https://c.animaapp.com/bADEbyrk/img/frame-18-1.svg"
          onClick={handlePrevClick}
        />

        <img
          className="frame-17"
          alt="Frame"
          src="https://c.animaapp.com/bADEbyrk/img/frame-17-1.svg"
          onClick={handleNextClick}
        />
      </div>
    </div>
  );
};
