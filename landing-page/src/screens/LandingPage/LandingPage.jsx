import React, { useEffect } from "react";
import { SectionFeature } from "./sections/SectionFeature";
import { Feedback } from "./sections/Feedback";
import { Header } from "./sections/Header";
import { Tittle } from "./sections/Tittle";
import "./style.css";
import { CoreValuesOption } from "./sections/CoreValuesOption/CoreValuesOption";
import { TopPlace } from "./sections/TopPlace/TopPlace";
import { TopPlaceList } from "../../components/TopPlaceList/TopPlaceList";
import { SectionPoint } from "./sections/SectionPoint/SectionPoint";
import { Footer } from "./sections/Footer/Footer";
import { Subscribe } from "./sections/Subscribe/Subscribe";
import AOS from 'aos';
import 'aos/dist/aos.css';

export const LandingPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      offset: 100,
      startEvent: 'DOMContentLoaded',
      mirror: false,
      disableMutationObserver: false,
      useClassNames: true,
      disable: window.innerWidth < 768 ? true : false
    });
  }, []);

  return (
    <div className="desktop" data-model-id="1:166">
      <div className="div-5">
        <div className="overlap-4">
          <div className="overlap-5">
            <div className="ellipse-9" />

            <Header />
          </div>

          <div className="overlap-6" data-aos="fade-up">
            <div className="ellipse-10" />

            <Tittle />
            <div className="basic-step">

              <div className="image-container" data-aos="fade-right" data-aos-delay="100">
                <img
                  className="image"
                  alt="Image1"
                  src="https://res.cloudinary.com/dgzn2ix8w/image/upload/v1748864617/Audivia/tm79xnelfoyp7pkoqusw.png"
                />
                <div className="image-title">Chọn điểm đến</div>
              </div>

              <div className="image-container" data-aos="fade-right" data-aos-delay="200">
                <img
                  className="image"
                  alt="Image1"
                  src="https://res.cloudinary.com/dgzn2ix8w/image/upload/v1748869134/Audivia/w4pudpuieovx7ohsj7bt.png"
                />
                <div className="image-title">Mua tour</div>
              </div>

              <div className="image-container" data-aos="fade-right" data-aos-delay="300">
                <img
                  className="image"
                  alt="Image1"
                  src="https://res.cloudinary.com/dgzn2ix8w/image/upload/v1748869439/Audivia/oo8wavvgpc0ykfxamgpr.png"
                />
                <div className="image-title">Đeo tai nghe</div>
              </div>
              <div className="image-container" data-aos="fade-right" data-aos-delay="400">
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

        <div className="overlap-7" data-aos="fade-up">

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
          <SectionFeature />
          <div className="ellipse-11" />
          <div data-aos="fade-left" className="feedback-container">
            <Feedback />
          </div>
          <img
            className="graphic-elements"
            alt="Graphic elements"
            src="https://c.animaapp.com/bADEbyrk/img/graphic-elements.svg"
          />
        </div>



        <div className="services-6" data-aos="fade-up">
          <div className="text-wrapper-34">GIÁ TRỊ CỐT LÕI</div>

          <div className="text-wrapper-35">Lý do nên chọn Audivia</div>
        </div>

        <div data-aos="fade-right">
          <CoreValuesOption />
        </div>
        <div data-aos="fade-left">
          <TopPlace />
        </div>
        <div data-aos="fade-right">
          <TopPlaceList />
        </div>
        <div className="overlap-9" data-aos="fade-left">
          <SectionPoint />
          <div className="ticket-star-wrapper">
            <img
              className="ticket-star"
              alt="Ticket star"
              src="https://c.animaapp.com/bADEbyrk/img/ticket-star-1.svg"
            />
          </div>
        </div>
        <div className="overlap-8" data-aos="fade-right">
          <img
            className="OBJECTS"
            alt="Objects"
            src="https://c.animaapp.com/bADEbyrk/img/objects.svg"
          />

          <Subscribe />
        </div>
        <Footer />
      </div>
    </div>
  );
};
