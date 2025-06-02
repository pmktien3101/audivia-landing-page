import React from "react";
import { CardsServices } from "../../../../components/CardsServices";
import "./style.css";

export const ServicesOption = () => {
  return (
    <div className="services-option">
      <CardsServices
        active="on"
        img="https://c.animaapp.com/bADEbyrk/img/vector-24.svg"
        services="all-you-needs"
        vector="https://c.animaapp.com/bADEbyrk/img/vector-22.svg"
      />
      <CardsServices
        active="off"
        group="https://c.animaapp.com/bADEbyrk/img/group-14@2x.png"
        services="flexible-booking"
      />
      <CardsServices
        active="off"
        groupClassName="cards-services-instance"
        services="secure-payment"
        vector1="https://c.animaapp.com/bADEbyrk/img/vector-25.svg"
        vector2="https://c.animaapp.com/bADEbyrk/img/vector-26.svg"
        vector3="https://c.animaapp.com/bADEbyrk/img/vector-27.svg"
        vector4="https://c.animaapp.com/bADEbyrk/img/vector-28.svg"
        vector5="/img/vector.svg"
      />
    </div>
  );
};
