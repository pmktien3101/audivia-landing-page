/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import "./style.css";

export const CardsServices = ({
  services,
  active,
  vector = "https://c.animaapp.com/bADEbyrk/img/vector.svg",
  img = "https://c.animaapp.com/bADEbyrk/img/vector-2.svg",
  group = "https://c.animaapp.com/bADEbyrk/img/group-3@2x.png",
  vector1 = "https://c.animaapp.com/bADEbyrk/img/vector-3.svg",
  vector2 = "https://c.animaapp.com/bADEbyrk/img/vector-4.svg",
  vector3 = "https://c.animaapp.com/bADEbyrk/img/vector-6.svg",
  vector4 = "https://c.animaapp.com/bADEbyrk/img/vector-7.svg",
  groupClassName,
  vector5 = "https://c.animaapp.com/bADEbyrk/img/vector-5.svg",
}) => {
  return (
    <div className={`cards-services ${services}`}>
      <div className={`group-5 ${active} services-${services}`}>
        {["all-you-needs", "secure-payment"].includes(services) && (
          <div className="overlap-3">
            {services === "all-you-needs" && (
              <>
                <div className="ellipse-8" />

                <div className={`group-6 ${groupClassName}`}>
                  <div className="overlap-group-4">
                    <img
                      className="group-7"
                      alt="Group"
                      src="https://c.animaapp.com/bADEbyrk/img/group-11@2x.png"
                    />

                    <img
                      className="group-8"
                      alt="Group"
                      src="https://c.animaapp.com/bADEbyrk/img/group-12@2x.png"
                    />

                    <img className="vector-11" alt="Vector" src={vector} />

                    <img
                      className="group-9"
                      alt="Group"
                      src="https://c.animaapp.com/bADEbyrk/img/group-13@2x.png"
                    />

                    <img
                      className="vector-12"
                      alt="Vector"
                      src="https://c.animaapp.com/bADEbyrk/img/vector-23.svg"
                    />

                    <img className="vector-13" alt="Vector" src={img} />
                  </div>
                </div>
              </>
            )}

            {active === "off" && (
              <>
                <div className="overlap-group-5">
                  <img
                    className="group-10"
                    alt="Group"
                    src="https://c.animaapp.com/bADEbyrk/img/group-15@2x.png"
                  />

                  <img className="vector-14" alt="Vector" src={vector1} />

                  <img className="vector-15" alt="Vector" src={vector2} />

                  <img className="vector-15" alt="Vector" src={vector3} />

                  <img className="vector-16" alt="Vector" src={vector4} />

                  <img
                    className="group-11"
                    alt="Group"
                    src="https://c.animaapp.com/bADEbyrk/img/group-16@2x.png"
                  />
                </div>

                <img
                  className={`vector-17 ${groupClassName}`}
                  alt="Vector"
                  src={vector5}
                />
              </>
            )}
          </div>
        )}

        {services === "flexible-booking" && (
          <img className="group-12" alt="Group" src={group} />
        )}
      </div>

      <div className="frame-48">
        <div className="all-you-needs-2">
          {services === "all-you-needs" && <>All You Needs</>}

          {services === "flexible-booking" && <>Flexible Booking</>}

          {services === "secure-payment" && <>Secure Payment</>}
        </div>

        <p className="text-wrapper-33">
          From flights, stays, to sights, just count on our complete products.
        </p>
      </div>
    </div>
  );
};
