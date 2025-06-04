/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import "./style.css";

export const CardsKeyFeatures = ({
  features,
  className,
  frame = "https://c.animaapp.com/bADEbyrk/img/frame-52.svg",
  divClassName,
  img = "https://c.animaapp.com/bADEbyrk/img/frame-53.svg",
  frame1 = "https://c.animaapp.com/bADEbyrk/img/frame-54.svg",
}) => {
  return (
    <div className={`cards-key-features ${features} ${className}`}>
      <img
        className="frame-46"
        alt="Frame"
        src={
          features === "share" ? img : features === "game" ? frame1 : frame
        }
      />

      <div className="frame-47">
        <div className={`select-many-location ${divClassName}`}>
          {features === "microphone" && <p className="title">Nghe thuyết minh sinh động</p>}

          {features === "share" && <p className="title">Chia sẻ trải nghiệm</p>}

          {features === "game" && <p className="title">Trò chơi hóa trải nghiệm</p>}
        </div>

        <div className="chooce-your-favorite">
          {features === "microphone" && <>Khám phá địa điểm du lịch với phần <br/> thuyết minh sinh động, chính xác và dễ hiểu</>}

          {features === "share" && (
            <p className="text-wrapper-36">Đăng tải cảm nghĩ và hình ảnh sau mỗi hành <br/> trình để lưu giữ kỷ niệm và truyền cảm hứng cho người khác</p>
          )}

          {features === "game" && (
            <p className="text-wrapper-36">Mỗi điểm đến là một thử thách. Mở khóa thành tựu, <br/> lên bảng xếp hạng và chia sẻ thành tích với bạn bè</p>
          )}
        </div>
      </div>
    </div>
  );
};
