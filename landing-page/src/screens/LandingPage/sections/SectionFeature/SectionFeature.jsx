import React from "react";
import { CardsKeyFeatures } from "../../../../components/CardsKeyFeatures";
import "./style.css";

export const SectionFeature = () => {
  return (
    <div className="frame">
      <div className="div-2">
        <div className="div-3">
          <div className="services-2">
            <div className="text-wrapper-14">TÍNH NĂNG CHÍNH</div>

            <div className="text-wrapper-15">Dịch vụ tốt nhất nên thử</div>
          </div>

          <p className="hay-travelo-there-to">
          Khám phá dễ dàng qua audio tour, hoàn thành thử thách thú vị và chia sẻ chuyến đi của bạn với bạn bè. Du lịch chưa bao giờ vui và gắn kết đến thế!
          </p>
        </div>

        <div className="div-4">
          <CardsKeyFeatures
            className="cards-key-features-instance"
            divClassName="design-component-instance-node"
            features="microphone"
            frame="https://res.cloudinary.com/dgzn2ix8w/image/upload/v1748869439/Audivia/oo8wavvgpc0ykfxamgpr.png"
          />
          <CardsKeyFeatures
            className="cards-key-features-instance"
            divClassName="design-component-instance-node"
            features="share"
            img="https://res.cloudinary.com/dgzn2ix8w/image/upload/v1749050165/Audivia/xvvdhvn7h9t7bdq49n48.png"
          />
          <CardsKeyFeatures
            className="cards-key-features-instance"
            divClassName="design-component-instance-node"
            features="game"
            frame1="https://res.cloudinary.com/dgzn2ix8w/image/upload/v1749050257/Audivia/tniubgtcurmi4omaogig.png"
          />
        </div>
      </div>

      <div className="overlap-group-wrapper">
        <div className="overlap-group-2">
          <img
            className="rectangle-5"
            alt="Rectangle"
            src="https://res.cloudinary.com/dgzn2ix8w/image/upload/v1749050699/Audivia/q3imy6pjssdmag2gnth9.png"
          />

          <img
            className="rectangle-6"
            alt="Rectangle"
            src="https://res.cloudinary.com/dgzn2ix8w/image/upload/v1749050647/Audivia/cyjegduem3muwozp0c9l.png"

          />
        </div>
      </div>
    </div>
  );
};
