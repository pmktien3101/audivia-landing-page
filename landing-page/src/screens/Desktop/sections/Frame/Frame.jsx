import React from "react";
import { CardsKeyFeatures } from "../../../../components/CardsKeyFeatures";
import "./style.css";

export const Frame = () => {
  return (
    <div className="frame">
      <div className="div-2">
        <div className="div-3">
          <div className="services-2">
            <div className="text-wrapper-14">KEY FEATURES</div>

            <div className="text-wrapper-15">We offer best services</div>
          </div>

          <p className="hay-travelo-there-to">
            Hay! Travelo there to help you find your dream holiday.
            <br />
            Easy you just find where you want to go and
            <br />
            buy the ticket.
          </p>
        </div>

        <div className="div-4">
          <CardsKeyFeatures
            active="off"
            className="cards-key-features-instance"
            divClassName="design-component-instance-node"
            features="location"
            frame="https://c.animaapp.com/bADEbyrk/img/frame-52-1.svg"
          />
          <CardsKeyFeatures
            active="on"
            className="cards-key-features-instance"
            divClassName="design-component-instance-node"
            features="date"
            img="https://c.animaapp.com/bADEbyrk/img/frame-53-1.svg"
          />
          <CardsKeyFeatures
            active="off"
            className="cards-key-features-instance"
            divClassName="design-component-instance-node"
            features="discount"
            frame1="https://c.animaapp.com/bADEbyrk/img/frame-54-1.svg"
          />
        </div>
      </div>

      <div className="overlap-group-wrapper">
        <div className="overlap-group-2">
          <img
            className="rectangle-5"
            alt="Rectangle"
            src="https://c.animaapp.com/bADEbyrk/img/rectangle-8@2x.png"
          />

          <img
            className="rectangle-6"
            alt="Rectangle"
            src="https://c.animaapp.com/bADEbyrk/img/rectangle-9@2x.png"
          />
        </div>
      </div>
    </div>
  );
};
