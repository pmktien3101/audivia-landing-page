import React from "react";
import { FaMicrophone } from "react-icons/fa";
import { MdHistory } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import "./style.css";
import "./responsive.css";
export const CoreValues = ({
  services,
}) => {
  const getIcon = () => {
    switch (services) {
      case "emotion":
        return <FaMicrophone className="icon-img" size={40} color="#d6a4ff" />;
      case "history":
        return <MdHistory className="icon-img" size={40} color="#d6a4ff" />;
      case "personal":
        return <FaUserCircle className="icon-img" size={40} color="#d6a4ff"/>;
      default:
        return null;
    }
  };

  return (
    <div className={`cards-services ${services}`}>
      <div className={`group-5`}>
        {getIcon()}
      </div>

      <div className="frame-48">
        <div className="all-you-needs-2">
          {services === "emotion" && (
            <>
              <p>Giọng Kể Truyền Cảm</p>
              <p className="text-wrapper-33">
                Biến mỗi câu chuyện thành trải nghiệm đa giác quan với giọng kể tâm huyết.
              </p>
            </>
          )}

          {services === "history" && (
            <>
              <p>Mỗi bước chân là một câu chuyện</p>
              <p className="text-wrapper-33">
                Chạm vào từng góc phố, lắng nghe tiếng thì thầm của quá khứ.
              </p>
            </>
          )}

          {services === "personal" && (
            <>
              <p>Tour Của Bạn, Cách Của Bạn</p>
              <p className="text-wrapper-33">
                Tùy chỉnh lộ trình và chia sẻ audio-note với cộng đồng.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
