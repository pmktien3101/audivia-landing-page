import React from "react";
import { Div } from "./sections/Div";
import { DivWrapper } from "./sections/DivWrapper";
import { Frame } from "./sections/Frame";
import { Frame1 } from "./sections/Frame1";
import { FrameWrapper } from "./sections/FrameWrapper";
import { Group } from "./sections/Group";
import { Header } from "./sections/Header";
import { SectionComponentNode } from "./sections/SectionComponentNode";
import { ServicesOption } from "./sections/ServicesOption";
import { Tittle } from "./sections/Tittle";
import "./style.css";

export const Desktop = () => {
  return (
    <div className="desktop" data-model-id="1:166">
      <div className="div-5">
        <div className="overlap-4">
          <div className="overlap-5">
            <div className="ellipse-9" />

            <Header />
          </div>

          <div className="overlap-6">
            <div className="ellipse-10" />

            <Tittle />
            <div className="basic-step">

              <div className="image-container">
                <img
                  className="image"
                  alt="Image1"
                  src="https://res.cloudinary.com/dgzn2ix8w/image/upload/v1748864617/Audivia/tm79xnelfoyp7pkoqusw.png"
                />
                <div className="image-title">Chọn điểm đến</div>
              </div>

              <div className="image-container">
                <img
                  className="image"
                  alt="Image1"
                  src="https://res.cloudinary.com/dgzn2ix8w/image/upload/v1748869134/Audivia/w4pudpuieovx7ohsj7bt.png"
                />
                <div className="image-title">Mua tour</div>
              </div>

              <div className="image-container">
                <img
                  className="image"
                  alt="Image1"
                  src="https://res.cloudinary.com/dgzn2ix8w/image/upload/v1748869439/Audivia/oo8wavvgpc0ykfxamgpr.png"
                />
                <div className="image-title">Đeo tai nghe</div>
              </div>
              <div className="image-container">
                <img
                  className="image"
                  alt="Image1"
                  src="https://res.cloudinary.com/dgzn2ix8w/image/upload/v1748870026/Audivia/e6rvf5cgg86hh4ft1nft.png"
                />
                <div className="image-title">Tự do trải nghiệm</div>
              </div>
            </div>
          </div>
        </div>

        <div className="overlap-7">
          <div className="ellipse-11" />

          <div className="BACKGROUND">
            <div className="overlap-group-8">
              <img
                className="clip-path-group"
                alt="Clip path group"
                src="https://c.animaapp.com/bADEbyrk/img/clip-path-group@2x.png"
              />

              <img
                className="group-18"
                alt="Group"
                src="https://c.animaapp.com/bADEbyrk/img/group-6@2x.png"
              />
            </div>
          </div>

          <Group />
          <Frame />
          <img
            className="graphic-elements"
            alt="Graphic elements"
            src="https://c.animaapp.com/bADEbyrk/img/graphic-elements.svg"
          />
        </div>

        <div className="overlap-8">
          <img
            className="OBJECTS"
            alt="Objects"
            src="https://c.animaapp.com/bADEbyrk/img/objects.svg"
          />

          <FrameWrapper />
        </div>

        <div className="services-6">
          <div className="text-wrapper-34">SERVICES</div>

          <div className="text-wrapper-35">Why book using Travelo</div>
        </div>

        <ServicesOption />
        <DivWrapper />
        <Div />
        <div className="overlap-9">
          <SectionComponentNode />
          <div className="ticket-star-wrapper">
            <img
              className="ticket-star"
              alt="Ticket star"
              src="https://c.animaapp.com/bADEbyrk/img/ticket-star-1.svg"
            />
          </div>
        </div>

        <Frame1 />
      </div>
    </div>
  );
};
